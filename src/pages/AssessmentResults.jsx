import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AssessmentResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { result, assessment } = location.state || {}

  if (!result || !assessment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-richblack-5 mb-4">No Results Found</h2>
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

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "text-green-500"
    if (percentage >= 80) return "text-blue-500"
    if (percentage >= 70) return "text-yellow-500"
    if (percentage >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B"
    if (percentage >= 60) return "C"
    if (percentage >= 50) return "D"
    return "F"
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-richblack-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-richblack-5 mb-2">Assessment Results</h1>
          <h2 className="text-xl text-richblack-200">{assessment.title}</h2>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-richblack-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-50 mb-2">{result.score}</div>
            <div className="text-richblack-200">Score</div>
            <div className="text-sm text-richblack-300">out of {result.totalPoints}</div>
          </div>
          
          <div className="bg-richblack-700 rounded-lg p-6 text-center">
            <div className={`text-3xl font-bold mb-2 ${getGradeColor(result.percentage)}`}>
              {result.percentage.toFixed(1)}%
            </div>
            <div className="text-richblack-200">Percentage</div>
            <div className="text-sm text-richblack-300">Grade: {getGrade(result.percentage)}</div>
          </div>
          
          <div className="bg-richblack-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-50 mb-2">
              {Math.floor(result.timeTaken)}m {Math.round((result.timeTaken % 1) * 60)}s
            </div>
            <div className="text-richblack-200">Time Taken</div>
            <div className="text-sm text-richblack-300">out of {assessment.timeLimit}m</div>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-richblack-200">Performance</span>
            <span className="text-richblack-200">{result.percentage.toFixed(1)}%</span>
          </div>
          <div className="bg-richblack-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                result.percentage >= 80 ? 'bg-green-500' :
                result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-richblack-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-richblack-5 mb-4">Assessment Details</h3>
            <div className="space-y-2 text-richblack-200">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span>{assessment.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Limit:</span>
                <span>{assessment.timeLimit} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Total Points:</span>
                <span>{assessment.totalPoints}</span>
              </div>
              <div className="flex justify-between">
                <span>Attempt Number:</span>
                <span>1</span>
              </div>
            </div>
          </div>

          <div className="bg-richblack-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-richblack-5 mb-4">Session Info</h3>
            <div className="space-y-2 text-richblack-200">
              <div className="flex justify-between">
                <span>Started:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Submitted:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tab Switches:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Warnings:</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-richblack-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-richblack-5 mb-4">Feedback</h3>
          <div className="text-richblack-200">
            {result.percentage >= 80 ? (
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Excellent work! You have a strong understanding of the material.
              </div>
            ) : result.percentage >= 60 ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Good effort! Consider reviewing the material for better understanding.
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You may want to review the course material and retake the assessment.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard/my-courses")}
            className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors"
          >
            Back to Courses
          </button>
          <button
            onClick={() => window.print()}
            className="bg-richblack-700 text-richblack-200 px-6 py-3 rounded-md font-medium hover:bg-richblack-600 transition-colors"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentResults
