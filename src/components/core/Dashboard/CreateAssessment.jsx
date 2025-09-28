import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { apiConnector } from "../../../services/apiConnector"
import { assessmentEndpoints } from "../../../services/apis"
import { setCourse } from "../../../slices/courseSlice"

const CreateAssessment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  
  const [loading, setLoading] = useState(false)

  // Redirect if no course is selected
  useEffect(() => {
    if (!course || !course._id) {
      alert("No course selected. Redirecting to your courses.")
      navigate("/dashboard/my-courses")
    }
  }, [course, navigate])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeLimit: 30,
    startDate: "",
    endDate: "",
    maxAttempts: 1,
    instructions: "",
    allowTabSwitch: false,
    questions: [
      {
        questionText: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        points: 1,
      },
    ],
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleQuestionChange = (questionIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === questionIndex
          ? { ...question, [field]: value }
          : question
      ),
    }))
  }

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: question.options.map((option, oIndex) =>
                oIndex === optionIndex
                  ? { ...option, [field]: value }
                  : option
              ),
            }
          : question
      ),
    }))
  }

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          points: 1,
        },
      ],
    }))
  }

  const removeQuestion = (questionIndex) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, index) => index !== questionIndex),
      }))
    }
  }

  const addOption = (questionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: [...question.options, { text: "", isCorrect: false }],
            }
          : question
      ),
    }))
  }

  const removeOption = (questionIndex, optionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: question.options.filter((_, oIndex) => oIndex !== optionIndex),
            }
          : question
      ),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if course is available
    if (!course || !course._id) {
      alert("No course selected. Please go back to your courses and select a course first.")
      navigate("/dashboard/my-courses")
      return
    }
    
    // Validation
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields")
      return
    }

    // Validate questions
    for (let i = 0; i < formData.questions.length; i++) {
      const question = formData.questions[i]
      if (!question.questionText.trim()) {
        alert(`Please enter question text for question ${i + 1}`)
        return
      }

      const validOptions = question.options.filter(option => option.text.trim())
      if (validOptions.length < 2) {
        alert(`Question ${i + 1} must have at least 2 options`)
        return
      }

      const correctOptions = validOptions.filter(option => option.isCorrect)
      if (correctOptions.length !== 1) {
        alert(`Question ${i + 1} must have exactly one correct option`)
        return
      }
    }

    try {
      setLoading(true)
      
      const payload = {
        ...formData,
        courseId: course._id,
        questions: formData.questions.map(question => ({
          ...question,
          options: question.options.filter(option => option.text.trim()),
        })),
      }

      const response = await apiConnector(
        "POST",
        assessmentEndpoints.CREATE_ASSESSMENT,
        payload,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        alert("Assessment created successfully!")
        navigate("/dashboard/my-courses")
      } else {
        alert(response.data.message || "Failed to create assessment")
      }
    } catch (error) {
      console.error("Error creating assessment:", error)
      const errorMessage = error.response?.data?.message || error.message || "Failed to create assessment. Please try again."
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Show loading or redirect if no course is selected
  if (!course || !course._id) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-richblack-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-richblack-5 mb-6">Create Assessment</h1>
        <p className="text-richblack-200 mb-6">Creating assessment for: <span className="font-semibold text-yellow-50">{course.courseName}</span></p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-richblack-5 font-medium mb-2">
                Assessment Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                placeholder="Enter assessment title"
                required
              />
            </div>
            
            <div>
              <label className="block text-richblack-5 font-medium mb-2">
                Time Limit (minutes) *
              </label>
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-richblack-5 font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
              placeholder="Enter assessment description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-richblack-5 font-medium mb-2">
                Start Date *
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-richblack-5 font-medium mb-2">
                End Date *
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-richblack-5 font-medium mb-2">
                Max Attempts
              </label>
              <input
                type="number"
                name="maxAttempts"
                value={formData.maxAttempts}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-richblack-5 font-medium mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
              placeholder="Enter any special instructions for students"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowTabSwitch"
              checked={formData.allowTabSwitch}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-50 bg-richblack-700 border-richblack-600 rounded focus:ring-yellow-50"
            />
            <label className="text-richblack-200">
              Allow tab switching during assessment
            </label>
          </div>

          {/* Questions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-richblack-5">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-yellow-50 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-100 transition-colors"
              >
                Add Question
              </button>
            </div>

            {formData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="bg-richblack-700 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-richblack-5">
                    Question {questionIndex + 1}
                  </h3>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-richblack-200 font-medium mb-2">
                      Question Text *
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(questionIndex, "questionText", e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 bg-richblack-800 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                      placeholder="Enter your question here"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="block text-richblack-200 font-medium">
                      Points:
                    </label>
                    <input
                      type="number"
                      value={question.points}
                      onChange={(e) => handleQuestionChange(questionIndex, "points", parseInt(e.target.value))}
                      className="w-20 px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                      min="1"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-richblack-200 font-medium">
                        Options *
                      </label>
                      <button
                        type="button"
                        onClick={() => addOption(questionIndex)}
                        className="text-yellow-400 hover:text-yellow-300 text-sm"
                      >
                        Add Option
                      </button>
                    </div>

                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={option.isCorrect}
                          onChange={(e) => {
                            // Uncheck all other options first
                            const updatedOptions = question.options.map((opt, idx) => ({
                              ...opt,
                              isCorrect: idx === optionIndex ? e.target.checked : false,
                            }))
                            handleQuestionChange(questionIndex, "options", updatedOptions)
                          }}
                          className="w-4 h-4 text-yellow-50 bg-richblack-800 border-richblack-600 focus:ring-yellow-50"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, "text", e.target.value)}
                          className="flex-1 px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:border-yellow-50"
                          placeholder="Enter option text"
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(questionIndex, optionIndex)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-courses")}
              className="bg-richblack-700 text-richblack-200 px-6 py-3 rounded-md font-medium hover:bg-richblack-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Assessment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAssessment
