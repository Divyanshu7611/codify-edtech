import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { apiConnector } from "../services/apiConnector"
import { assessmentEndpoints } from "../services/apis"

const Assessment = () => {
  const { assessmentId } = useParams()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  
  const [assessment, setAssessment] = useState(null)
  const [attempt, setAttempt] = useState(null)
  const [answers, setAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [warnings, setWarnings] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [startTime, setStartTime] = useState(null)
  
  const intervalRef = useRef(null)
  const warningTimeoutRef = useRef(null)

  // Tab switching detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && assessment && !assessment.allowTabSwitch) {
        setTabSwitches(prev => prev + 1)
        setWarnings(prev => prev + 1)
        setShowWarning(true)
        
        // Hide warning after 3 seconds
        if (warningTimeoutRef.current) {
          clearTimeout(warningTimeoutRef.current)
        }
        warningTimeoutRef.current = setTimeout(() => {
          setShowWarning(false)
        }, 3000)
      }
    }

    const handleBlur = () => {
      if (assessment && !assessment.allowTabSwitch) {
        setTabSwitches(prev => prev + 1)
        setWarnings(prev => prev + 1)
        setShowWarning(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
    }
  }, [assessment])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && assessment) {
      handleSubmit()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timeLeft, assessment])

  useEffect(() => {
    fetchAssessment()
  }, [assessmentId])

  const fetchAssessment = async () => {
    try {
      setLoading(true)
      const response = await apiConnector(
        "GET",
        `${assessmentEndpoints.GET_ASSESSMENT_FOR_STUDENT}/${assessmentId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        setAssessment(response.data.data)
        setTimeLeft(response.data.data.timeLimit * 60) // Convert minutes to seconds
        setStartTime(new Date())
        
        // Initialize answers array
        const initialAnswers = response.data.data.questions.map((_, index) => ({
          questionIndex: index,
          selectedOptionIndex: -1,
        }))
        setAnswers(initialAnswers)
      }
    } catch (error) {
      console.error("Error fetching assessment:", error)
      navigate("/dashboard/my-courses")
    } finally {
      setLoading(false)
    }
  }

  const startAssessment = async () => {
    try {
      const response = await apiConnector(
        "POST",
        `${assessmentEndpoints.START_ASSESSMENT}/${assessmentId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        setAttempt(response.data.data)
      }
    } catch (error) {
      console.error("Error starting assessment:", error)
    }
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers(prev => 
      prev.map((answer, index) => 
        index === questionIndex 
          ? { ...answer, selectedOptionIndex: optionIndex }
          : answer
      )
    )
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const endTime = new Date()
      const timeTaken = startTime ? (endTime - startTime) / (1000 * 60) : 0 // in minutes

      const response = await apiConnector(
        "POST",
        `${assessmentEndpoints.SUBMIT_ASSESSMENT}/${attempt.attemptId}`,
        {
          answers,
          timeTaken,
          tabSwitches,
          warnings,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        navigate("/dashboard/assessment-results", {
          state: {
            result: response.data.data,
            assessment: assessment,
          }
        })
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-richblack-5 mb-4">Assessment Not Found</h2>
          <button
            onClick={() => navigate("/dashboard/my-courses")}
            className="bg-yellow-50 text-black px-4 py-2 rounded-md font-medium"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-richblack-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-richblack-5 mb-4">{assessment.title}</h1>
          <p className="text-richblack-200 mb-6">{assessment.description}</p>
          
          <div className="bg-richblack-700 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-richblack-5 mb-4">Assessment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-richblack-200">
              <div>
                <span className="font-medium">Time Limit:</span> {assessment.timeLimit} minutes
              </div>
              <div>
                <span className="font-medium">Questions:</span> {assessment.questions.length}
              </div>
              <div>
                <span className="font-medium">Total Points:</span> {assessment.totalPoints}
              </div>
              <div>
                <span className="font-medium">Tab Switching:</span> {assessment.allowTabSwitch ? "Allowed" : "Not Allowed"}
              </div>
            </div>
          </div>

          {assessment.instructions && (
            <div className="bg-richblack-700 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-richblack-5 mb-4">Instructions</h3>
              <p className="text-richblack-200 whitespace-pre-line">{assessment.instructions}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={startAssessment}
              className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors"
            >
              Start Assessment
            </button>
            <button
              onClick={() => navigate("/dashboard/my-courses")}
              className="bg-richblack-700 text-richblack-200 px-6 py-3 rounded-md font-medium hover:bg-richblack-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* Warning Banner */}
      {showWarning && (
        <div className="bg-red-600 text-white p-4 text-center fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-bold">WARNING: Tab switching detected! This may result in assessment termination.</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-richblack-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-richblack-5">{assessment.title}</h1>
              <p className="text-richblack-200">Question {currentQuestion + 1} of {assessment.questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-50">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-richblack-200">
                Time Remaining
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-richblack-700 rounded-full h-2">
              <div 
                className="bg-yellow-50 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-richblack-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-richblack-5 mb-6">
            {assessment.questions[currentQuestion].questionText}
          </h2>
          
          <div className="space-y-3">
            {assessment.questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  answers[currentQuestion]?.selectedOptionIndex === index
                    ? 'border-yellow-50 bg-yellow-50/10'
                    : 'border-richblack-600 hover:border-richblack-500'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={answers[currentQuestion]?.selectedOptionIndex === index}
                  onChange={() => handleAnswerSelect(currentQuestion, index)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-richblack-300 mr-3 flex items-center justify-center">
                    {answers[currentQuestion]?.selectedOptionIndex === index && (
                      <span className="w-3 h-3 rounded-full bg-yellow-50"></span>
                    )}
                  </span>
                  <span className="text-richblack-200">{option.text}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="bg-richblack-700 text-richblack-200 px-6 py-3 rounded-md font-medium hover:bg-richblack-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {assessment.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-yellow-50 text-black'
                    : answers[index]?.selectedOptionIndex !== -1
                    ? 'bg-green-600 text-white'
                    : 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {currentQuestion === assessment.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Assessment"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(assessment.questions.length - 1, prev + 1))}
              className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 bg-richblack-800 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center text-richblack-200">
            <div>
              <div className="text-lg font-semibold">{tabSwitches}</div>
              <div className="text-sm">Tab Switches</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{warnings}</div>
              <div className="text-sm">Warnings</div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {answers.filter(answer => answer.selectedOptionIndex !== -1).length}
              </div>
              <div className="text-sm">Answered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessment
