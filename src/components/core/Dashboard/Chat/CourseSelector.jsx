import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { VscMortarBoard, VscVm } from "react-icons/vsc"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI"

export default function CourseSelector({ selectedCourse, onCourseSelect, isInstructor, isStudent }) {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        let courseData = []

        if (isInstructor) {
          // Fetch instructor's courses
          courseData = await fetchInstructorCourses(token)
        } else if (isStudent) {
          // Fetch enrolled courses
          const enrolledCourses = await getUserEnrolledCourses(token)
          courseData = enrolledCourses.filter(course => course.status === "Published")
        }

        setCourses(courseData || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [token, isInstructor, isStudent])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-richblack-700 bg-richblack-800 p-4">
        <h2 className="text-lg font-semibold text-richblack-5">
          {isInstructor ? "My Courses" : "Enrolled Courses"}
        </h2>
        <p className="text-sm text-richblack-300">
          {isInstructor 
            ? "Select a course to view student discussions" 
            : "Select a course to join the discussion"
          }
        </p>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto">
        {courses.length === 0 ? (
          <div className="flex h-full items-center justify-center p-4">
            <div className="text-center">
              <div className="mb-2 text-4xl">📚</div>
              <p className="text-richblack-300">
                {isInstructor 
                  ? "No courses created yet" 
                  : "No enrolled courses yet"
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => onCourseSelect(course._id)}
                className={`mb-2 cursor-pointer rounded-lg p-3 transition-all duration-200 hover:bg-richblack-700 ${
                  selectedCourse === course._id
                    ? "bg-yellow-800 text-yellow-50"
                    : "bg-richblack-800 text-richblack-5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{course.courseName}</h3>
                    <p className="text-xs text-richblack-300 truncate">
                      {course.courseDescription}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      {isInstructor ? (
                        <>
                          <VscVm className="text-richblack-400" />
                          <span className="text-richblack-400">
                            {course.studentsEnroled?.length || 0} students
                          </span>
                        </>
                      ) : (
                        <>
                          <VscMortarBoard className="text-richblack-400" />
                          <span className="text-richblack-400">
                            {course.instructor?.firstName} {course.instructor?.lastName}
                          </span>
                        </>
                      )}
                    </div>
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
