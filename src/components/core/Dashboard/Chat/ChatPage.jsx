import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { ACCOUNT_TYPE } from "../../../../utils/constants"
import ChatInterface from "./ChatInterface"
import CourseSelector from "./CourseSelector"

export default function ChatPage() {
  const { courseId } = useParams()
  const { user } = useSelector((state) => state.profile)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Determine if user is instructor or student
  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
  const isStudent = user?.accountType === ACCOUNT_TYPE.STUDENT

  useEffect(() => {
    console.log("ChatPage - courseId from params:", courseId)
    if (courseId) {
      console.log("ChatPage - setting selected course:", courseId)
      setSelectedCourse(courseId)
    }
  }, [courseId])
  
  console.log("ChatPage - selectedCourse:", selectedCourse)
  console.log("ChatPage - isInstructor:", isInstructor, "isStudent:", isStudent)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Course Selector Sidebar */}
          <div className="w-80 border-r border-richblack-700 bg-richblack-800">
            <CourseSelector
              selectedCourse={selectedCourse}
              onCourseSelect={setSelectedCourse}
              isInstructor={isInstructor}
              isStudent={isStudent}
            />
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            {selectedCourse ? (
              <ChatInterface
                courseId={selectedCourse}
                isInstructor={isInstructor}
                isStudent={isStudent}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-richblack-900">
                <div className="text-center">
                  <div className="mb-4 text-6xl">💬</div>
                  <h2 className="mb-2 text-2xl font-bold text-richblack-5">
                    Select a Course
                  </h2>
                  <p className="text-richblack-300">
                    Choose a course to start chatting with your peers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
