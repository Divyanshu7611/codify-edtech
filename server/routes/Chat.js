const express = require("express")
const {
  sendMessage,
  getMessagesByCourse,
  editMessage,
  deleteMessage,
  markAsRead,
  getOnlineUsers,
  updateOnlineStatus
} = require("../controllers/Chat")
const { auth, isStudent, isInstructor, isAdmin } = require("../middleware/auth")
const upload = require("../middleware/multer")

const router = express.Router()

// All routes require authentication
router.use(auth)

// Send a message to a course chat (handles both text and file messages)
router.post("/send", (req, res, next) => {
  // Check if the request has a file
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    // Use multer middleware for file uploads
    upload.single('file')(req, res, next)
  } else {
    // Skip multer for JSON requests
    next()
  }
}, sendMessage)

// Get messages for a specific course with pagination
router.get("/course/:courseId", getMessagesByCourse)

// Edit a message (only sender can edit)
router.put("/edit/:messageId", editMessage)

// Delete a message (sender or instructor can delete)
router.delete("/delete/:messageId", deleteMessage)

// Mark a message as read
router.put("/read/:messageId", markAsRead)

// Get online users for a course
router.get("/online/:courseId", getOnlineUsers)

// Update user's online status
router.put("/status", updateOnlineStatus)

module.exports = router
