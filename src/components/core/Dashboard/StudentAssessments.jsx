import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { apiConnector } from "../../../services/apiConnector"
import { assessmentEndpoints } from "../../../services/apis"
import { setCourse } from "../../../slices/courseSlice"

const StudentAssessments = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (course && course._id) {
      fetchAssessments()
    }
  }, [course])

  // Redirect if no course is selected
  useEffect(() => {
    if (!course || !course._id) {
      alert("No course selected. Redirecting to your courses.")
      window.location.href = "/dashboard/enrolled-courses"
    }
  }, [course])

  const fetchAssessments = async () => {
    try {
      setLoading(true)
      const response = await apiConnector(
        "GET",
        `${assessmentEndpoints.GET_AVAILABLE_ASSESSMENTS}/${course._id}`,
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
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Expired</span>
    } else {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</span>
    }
  }

  const getAttemptBadge = (assessment) => {
    if (assessment.attemptsUsed >= assessment.maxAttempts) {
      return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Max Attempts Reached</span>
    } else if (assessment.lastAttempt) {
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
        {assessment.attemptsUsed}/{assessment.maxAttempts} Attempts Used
      </span>
    } else {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Ready to Start</span>
    }
  }

  const handleStartAssessment = (assessmentId) => {
    dispatch(setCourse(course))
    window.location.href = `/dashboard/assessment/${assessmentId}`
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-richblack-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-richblack-5 mb-6">Course Assessments</h1>

        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-richblack-5 mb-2">No Assessments Available</h3>
            <p className="text-richblack-200">
              There are currently no assessments available for this course.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <div key={assessment._id} className="bg-richblack-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-richblack-5">
                        {assessment.title}
                      </h3>
                      {getStatusBadge(assessment)}
                      {getAttemptBadge(assessment)}
                    </div>
                    
                    <p className="text-richblack-200 mb-4">{assessment.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-richblack-200">
                      <div>
                        <span className="font-medium">Questions:</span> {assessment.questions.length}
                      </div>
                      <div>
                        <span className="font-medium">Time Limit:</span> {assessment.timeLimit} min
                      </div>
                      <div>
                        <span className="font-medium">Total Points:</span> {assessment.totalPoints}
                      </div>
                      <div>
                        <span className="font-medium">Tab Switching:</span> {assessment.allowTabSwitch ? "Allowed" : "Not Allowed"}
                      </div>
                    </div>

                    {assessment.instructions && (
                      <div className="mt-4 p-4 bg-richblack-600 rounded-lg">
                        <h4 className="font-medium text-richblack-5 mb-2">Instructions:</h4>
                        <p className="text-richblack-200 text-sm whitespace-pre-line">
                          {assessment.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-richblack-200">
                    <div>Available: {formatDate(assessment.startDate)} - {formatDate(assessment.endDate)}</div>
                    {assessment.lastAttempt && (
                      <div className="mt-1">
                        Last attempt: {formatDate(assessment.lastAttempt.submittedAt)} 
                        (Score: {assessment.lastAttempt.score}/{assessment.lastAttempt.totalPoints})
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {assessment.canAttempt && new Date() >= new Date(assessment.startDate) && new Date() <= new Date(assessment.endDate) ? (
                      <button
                        onClick={() => handleStartAssessment(assessment._id)}
                        className="bg-yellow-50 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-100 transition-colors"
                      >
                        {assessment.lastAttempt ? "Retake Assessment" : "Start Assessment"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-richblack-600 text-richblack-400 px-6 py-2 rounded-md font-medium cursor-not-allowed"
                      >
                        {new Date() < new Date(assessment.startDate) ? "Not Yet Available" :
                         new Date() > new Date(assessment.endDate) ? "Expired" :
                         "Max Attempts Reached"}
                      </button>
                    )}
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

export default StudentAssessments
