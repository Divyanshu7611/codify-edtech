const Assessment = require("../models/Assessment")
const AssessmentResult = require("../models/AssessmentResult")
const Course = require("../models/Course")
const User = require("../models/User")

// Create a new assessment
exports.createAssessment = async (req, res) => {
  try {
    const {
      title,
      description,
      courseId,
      questions,
      timeLimit,
      startDate,
      endDate,
      maxAttempts,
      instructions,
      allowTabSwitch,
    } = req.body

    const instructorId = req.user.id

    // Validate required fields
    if (!title || !description || !courseId || !questions || !timeLimit || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      })
    }

    // Check if course exists and instructor is authorized
    const course = await Course.findById(courseId).populate("instructor")
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    if (course.instructor._id.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to create assessment for this course",
      })
    }

    // Validate questions structure
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one question is required",
      })
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      if (!question.questionText || !question.options || !Array.isArray(question.options)) {
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} must have questionText and options array`,
        })
      }

      if (question.options.length < 2) {
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} must have at least 2 options`,
        })
      }

      const correctOptions = question.options.filter((option) => option.isCorrect)
      if (correctOptions.length !== 1) {
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} must have exactly one correct option`,
        })
      }
    }

    // Validate dates
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start <= now) {
      return res.status(400).json({
        success: false,
        message: "Start date must be in the future",
      })
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      })
    }

    // Create assessment
    const assessment = await Assessment.create({
      title,
      description,
      course: courseId,
      instructor: instructorId,
      questions,
      timeLimit,
      startDate: start,
      endDate: end,
      maxAttempts: maxAttempts || 1,
      instructions: instructions || "",
      allowTabSwitch: allowTabSwitch || false,
    })

    // Add assessment to course
    await Course.findByIdAndUpdate(courseId, {
      $push: { assessments: assessment._id },
    })

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: assessment,
    })
  } catch (error) {
    console.error("Error creating assessment:", error)
    res.status(500).json({
      success: false,
      message: "Failed to create assessment",
      error: error.message,
    })
  }
}

// Get all assessments for a course (instructor view)
exports.getCourseAssessments = async (req, res) => {
  try {
    const { courseId } = req.params
    const instructorId = req.user.id

    // Check if course exists and instructor is authorized
    const course = await Course.findById(courseId).populate("instructor")
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    if (course.instructor._id.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view assessments for this course",
      })
    }

    const assessments = await Assessment.find({ course: courseId })
      .populate("assessment")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: assessments,
    })
  } catch (error) {
    console.error("Error fetching assessments:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch assessments",
      error: error.message,
    })
  }
}

// Get available assessments for a student
exports.getAvailableAssessments = async (req, res) => {
  try {
    const { courseId } = req.params
    const studentId = req.user.id

    // Check if student is enrolled in the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    const isEnrolled = course.studentsEnroled.includes(studentId)
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    const now = new Date()
    const assessments = await Assessment.find({
      course: courseId,
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ startDate: 1 })

    // Get student's attempt history
    const results = await AssessmentResult.find({
      student: studentId,
      assessment: { $in: assessments.map((a) => a._id) },
    })

    const assessmentsWithAttempts = assessments.map((assessment) => {
      const studentResults = results.filter((result) =>
        result.assessment.toString() === assessment._id.toString()
      )
      const attemptsUsed = studentResults.length
      const canAttempt = attemptsUsed < assessment.maxAttempts

      return {
        ...assessment.toObject(),
        attemptsUsed,
        canAttempt,
        lastAttempt: studentResults.length > 0 ? studentResults[studentResults.length - 1] : null,
      }
    })

    res.status(200).json({
      success: true,
      data: assessmentsWithAttempts,
    })
  } catch (error) {
    console.error("Error fetching available assessments:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch available assessments",
      error: error.message,
    })
  }
}

// Get assessment details for student
exports.getAssessmentForStudent = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const studentId = req.user.id

    const assessment = await Assessment.findById(assessmentId).populate("course")
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      })
    }

    // Check if student is enrolled
    const isEnrolled = assessment.course.studentsEnroled.includes(studentId)
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    // Check if assessment is currently available
    const now = new Date()
    if (now < assessment.startDate || now > assessment.endDate) {
      return res.status(403).json({
        success: false,
        message: "Assessment is not currently available",
      })
    }

    // Check attempt limit
    const existingResults = await AssessmentResult.find({
      student: studentId,
      assessment: assessmentId,
    })

    if (existingResults.length >= assessment.maxAttempts) {
      return res.status(403).json({
        success: false,
        message: "Maximum attempts reached for this assessment",
      })
    }

    // Check if student has an ongoing attempt
    const ongoingAttempt = await AssessmentResult.findOne({
      student: studentId,
      assessment: assessmentId,
      status: "In Progress",
    })

    if (ongoingAttempt) {
      // Check if ongoing attempt is still valid (within time limit)
      const timeElapsed = (now - ongoingAttempt.startedAt) / (1000 * 60) // in minutes
      if (timeElapsed >= assessment.timeLimit) {
        // Auto-submit expired attempt
        await AssessmentResult.findByIdAndUpdate(ongoingAttempt._id, {
          status: "Abandoned",
          submittedAt: now,
        })
      } else {
        return res.status(409).json({
          success: false,
          message: "You have an ongoing attempt",
          ongoingAttempt: ongoingAttempt._id,
        })
      }
    }

    // Return assessment without correct answers
    const assessmentForStudent = {
      ...assessment.toObject(),
      questions: assessment.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({
          text: option.text,
          // Don't include isCorrect for student
        })),
        points: question.points,
      })),
    }

    res.status(200).json({
      success: true,
      data: assessmentForStudent,
    })
  } catch (error) {
    console.error("Error fetching assessment for student:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment",
      error: error.message,
    })
  }
}

// Start assessment attempt
exports.startAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const studentId = req.user.id

    const assessment = await Assessment.findById(assessmentId)
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      })
    }

    // Check if assessment is available
    const now = new Date()
    if (now < assessment.startDate || now > assessment.endDate) {
      return res.status(403).json({
        success: false,
        message: "Assessment is not currently available",
      })
    }

    // Check attempt limit
    const existingResults = await AssessmentResult.find({
      student: studentId,
      assessment: assessmentId,
    })

    if (existingResults.length >= assessment.maxAttempts) {
      return res.status(403).json({
        success: false,
        message: "Maximum attempts reached",
      })
    }

    // Create new attempt
    const attempt = await AssessmentResult.create({
      student: studentId,
      assessment: assessmentId,
      course: assessment.course,
      totalPoints: assessment.totalPoints,
      startedAt: now,
      submittedAt: now, // Will be updated when submitted
      attemptNumber: existingResults.length + 1,
    })

    res.status(201).json({
      success: true,
      message: "Assessment attempt started",
      data: {
        attemptId: attempt._id,
        timeLimit: assessment.timeLimit,
        allowTabSwitch: assessment.allowTabSwitch,
      },
    })
  } catch (error) {
    console.error("Error starting assessment:", error)
    res.status(500).json({
      success: false,
      message: "Failed to start assessment",
      error: error.message,
    })
  }
}

// Submit assessment
exports.submitAssessment = async (req, res) => {
  try {
    const { attemptId } = req.params
    const { answers, timeTaken, tabSwitches, warnings } = req.body
    const studentId = req.user.id

    const attempt = await AssessmentResult.findById(attemptId).populate("assessment")
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Assessment attempt not found",
      })
    }

    if (attempt.student.toString() !== studentId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to submit this attempt",
      })
    }

    if (attempt.status !== "In Progress") {
      return res.status(400).json({
        success: false,
        message: "Assessment attempt has already been submitted",
      })
    }

    // Validate answers and calculate score
    let score = 0
    const processedAnswers = []

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i]
      const question = attempt.assessment.questions[answer.questionIndex]

      if (!question) {
        continue
      }

      const isCorrect = question.options[answer.selectedOptionIndex]?.isCorrect || false
      const points = isCorrect ? question.points : 0
      score += points

      processedAnswers.push({
        questionIndex: answer.questionIndex,
        selectedOptionIndex: answer.selectedOptionIndex,
        isCorrect,
        points,
      })
    }

    // Update attempt
    const updatedAttempt = await AssessmentResult.findByIdAndUpdate(
      attemptId,
      {
        answers: processedAnswers,
        score,
        timeTaken,
        tabSwitches: tabSwitches || 0,
        warnings: warnings || 0,
        status: "Completed",
        submittedAt: new Date(),
      },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: "Assessment submitted successfully",
      data: {
        score,
        totalPoints: attempt.totalPoints,
        percentage: (score / attempt.totalPoints) * 100,
        timeTaken,
      },
    })
  } catch (error) {
    console.error("Error submitting assessment:", error)
    res.status(500).json({
      success: false,
      message: "Failed to submit assessment",
      error: error.message,
    })
  }
}

// Get assessment results for instructor
exports.getAssessmentResults = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const instructorId = req.user.id

    const assessment = await Assessment.findById(assessmentId)
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      })
    }

    if (assessment.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view results for this assessment",
      })
    }

    const results = await AssessmentResult.find({ assessment: assessmentId })
      .populate("student", "firstName lastName email")
      .sort({ submittedAt: -1 })

    res.status(200).json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Error fetching assessment results:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment results",
      error: error.message,
    })
  }
}

// Update assessment
exports.updateAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const instructorId = req.user.id
    const updateData = req.body

    const assessment = await Assessment.findById(assessmentId)
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      })
    }

    if (assessment.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this assessment",
      })
    }

    // Don't allow updates if assessment has started
    const now = new Date()
    if (now >= assessment.startDate) {
      return res.status(400).json({
        success: false,
        message: "Cannot update assessment after it has started",
      })
    }

    const updatedAssessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      updateData,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: updatedAssessment,
    })
  } catch (error) {
    console.error("Error updating assessment:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update assessment",
      error: error.message,
    })
  }
}

// Delete assessment
exports.deleteAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const instructorId = req.user.id

    const assessment = await Assessment.findById(assessmentId)
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      })
    }

    if (assessment.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this assessment",
      })
    }

    // Don't allow deletion if assessment has started
    const now = new Date()
    if (now >= assessment.startDate) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete assessment after it has started",
      })
    }

    // Delete assessment results
    await AssessmentResult.deleteMany({ assessment: assessmentId })

    // Remove assessment from course
    await Course.findByIdAndUpdate(assessment.course, {
      $pull: { assessments: assessmentId },
    })

    // Delete assessment
    await Assessment.findByIdAndDelete(assessmentId)

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting assessment:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete assessment",
      error: error.message,
    })
  }
}
