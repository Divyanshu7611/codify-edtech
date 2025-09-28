const express = require("express")
const {
  createAssessment,
  getCourseAssessments,
  getAvailableAssessments,
  getAssessmentForStudent,
  startAssessment,
  submitAssessment,
  getAssessmentResults,
  updateAssessment,
  deleteAssessment,
} = require("../controllers/Assessment")
const { auth, isInstructor, isStudent } = require("../middleware/auth")

const router = express.Router()

// Instructor routes
router.post("/create", auth, isInstructor, createAssessment)
router.get("/course/:courseId", auth, isInstructor, getCourseAssessments)
router.get("/:assessmentId/results", auth, isInstructor, getAssessmentResults)
router.put("/:assessmentId", auth, isInstructor, updateAssessment)
router.delete("/:assessmentId", auth, isInstructor, deleteAssessment)

// Student routes
router.get("/available/:courseId", auth, isStudent, getAvailableAssessments)
router.get("/student/:assessmentId", auth, isStudent, getAssessmentForStudent)
router.post("/:assessmentId/start", auth, isStudent, startAssessment)
router.post("/submit/:attemptId", auth, isStudent, submitAssessment)

module.exports = router
