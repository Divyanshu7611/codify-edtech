import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { apiConnector } from "../../../services/apiConnector"
import { assessmentEndpoints } from "../../../services/apis"
import { setCourse } from "../../../slices/courseSlice"

const AssessmentManagement = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (course && course._id) {
      fetchAssessments()
    }
  }, [course])

  // Redirect if no course is selected
  useEffect(() => {
    if (!course || !course._id) {
      alert("No course selected. Redirecting to your courses.")
      window.location.href = "/dashboard/my-courses"
    }
  }, [course])

  const fetchAssessments = async () => {
    try {
      setLoading(true)
      const response = await apiConnector(
        "GET",
        `${assessmentEndpoints.GET_COURSE_ASSESSMENTS}/${course._id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        setAssessments(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching assessments:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchResults = async (assessmentId) => {
    try {
      const response = await apiConnector(
        "GET",
        `${assessmentEndpoints.GET_ASSESSMENT_RESULTS}/${assessmentId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        setResults(response.data.data)
        setSelectedAssessment(assessments.find(a => a._id === assessmentId))
        setShowResults(true)
      }
    } catch (error) {
      console.error("Error fetching results:", error)
    }
  }

  const deleteAssessment = async (assessmentId) => {
    if (!window.confirm("Are you sure you want to delete this assessment? This action cannot be undone.")) {
      return
    }

    try {
      const response = await apiConnector(
        "DELETE",
        `${assessmentEndpoints.DELETE_ASSESSMENT}/${assessmentId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        alert("Assessment deleted successfully")
        fetchAssessments()
      }
    } catch (error) {
      console.error("Error deleting assessment:", error)
      alert("Failed to delete assessment")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (assessment) => {
    const now = new Date()
    const start = new Date(assessment.startDate)
    const end = new Date(assessment.endDate)

    if (now < start) {
      return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Upcoming</span>
    } else if (now > end) {
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Completed</span>
    } else {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-richblack-800 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-richblack-5">
              Results for: {selectedAssessment?.title}
            </h2>
            <button
              onClick={() => setShowResults(false)}
              className="bg-richblack-700 text-richblack-200 px-4 py-2 rounded-md hover:bg-richblack-600"
            >
              Back to Assessments
            </button>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-richblack-200">No results available yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-richblack-700 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-richblack-900">
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Student</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Score</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Percentage</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Time Taken</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Attempt</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Status</th>
                    <th className="px-6 py-3 text-left text-richblack-5 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result._id} className={index % 2 === 0 ? "bg-richblack-700" : "bg-richblack-800"}>
                      <td className="px-6 py-4 text-richblack-200">
                        {result.student.firstName} {result.student.lastName}
                      </td>
                      <td className="px-6 py-4 text-richblack-200">
                        {result.score}/{result.totalPoints}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          result.percentage >= 80 ? "text-green-400" :
                          result.percentage >= 60 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {result.percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-richblack-200">
                        {Math.floor(result.timeTaken)}m {Math.round((result.timeTaken % 1) * 60)}s
                      </td>
                      <td className="px-6 py-4 text-richblack-200">
                        {result.attemptNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          result.status === "Completed" ? "bg-green-100 text-green-800" :
                          result.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-richblack-200">
                        {formatDate(result.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-richblack-800 rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-richblack-5">Course Assessments</h1>
          <button
            onClick={() => {
              dispatch(setCourse(course))
              window.location.href = "/dashboard/create-assessment"
            }}
            className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors"
          >
            Create Assessment
          </button>
        </div>

        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-richblack-5 mb-2">No Assessments Yet</h3>
            <p className="text-richblack-200 mb-6">
              Create your first assessment to evaluate your students' progress.
            </p>
            <button
              onClick={() => {
                dispatch(setCourse(course))
                window.location.href = "/dashboard/create-assessment"
              }}
              className="bg-yellow-50 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-100 transition-colors"
            >
              Create Assessment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <div key={assessment._id} className="bg-richblack-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                      {assessment.title}
                    </h3>
                    <p className="text-richblack-200 mb-4">{assessment.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-richblack-200">
                      <div>
                        <span className="font-medium">Questions:</span> {assessment.questions.length}
                      </div>
                      <div>
                        <span className="font-medium">Time Limit:</span> {assessment.timeLimit} min
                      </div>
                      <div>
                        <span className="font-medium">Max Attempts:</span> {assessment.maxAttempts}
                      </div>
                      <div>
                        <span className="font-medium">Tab Switching:</span> {assessment.allowTabSwitch ? "Allowed" : "Not Allowed"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(assessment)}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-richblack-200">
                    <div>Start: {formatDate(assessment.startDate)}</div>
                    <div>End: {formatDate(assessment.endDate)}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchResults(assessment._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Results
                    </button>
                    <button
                      onClick={() => deleteAssessment(assessment._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AssessmentManagement
