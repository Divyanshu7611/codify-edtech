const Chat = require("../models/Chat")
const Course = require("../models/Course")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Send a message to a course chat
exports.sendMessage = async (req, res) => {
  try {
    const { courseId, message, messageType = "text", replyTo } = req.body
    const userId = req.user.id

    // Validate required fields
    if (!courseId || !message) {
      return res.status(400).json({
        success: false,
        message: "Course ID and message are required"
      })
    }

    // Check if course exists and user is enrolled
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    // Check if user is enrolled in the course
    const isEnrolled = course.studentsEnroled.includes(userId) || course.instructor.toString() === userId
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course"
      })
    }

    // Check if chat is enabled for this course
    if (!course.chatEnabled) {
      return res.status(403).json({
        success: false,
        message: "Chat is disabled for this course"
      })
    }

    // Handle file upload if message type is image or file
    let fileUrl = null
    let fileName = null
    if (messageType === "image" || messageType === "file") {
      // Only check for files if the request has files (multipart/form-data)
      if (req.files && req.files.file) {
        const file = req.files.file
        const uploadResult = await uploadImageToCloudinary(file, process.env.FOLDER_NAME)
        fileUrl = uploadResult.secure_url
        fileName = file.name
      } else {
        return res.status(400).json({
          success: false,
          message: "File is required for this message type"
        })
      }
    }

    // Create the message
    const newMessage = await Chat.create({
      course: courseId,
      sender: userId,
      message: message,
      messageType: messageType,
      fileUrl: fileUrl,
      fileName: fileName,
      replyTo: replyTo || null,
    })

    // Populate sender information
    await newMessage.populate('sender', 'firstName lastName image accountType')

    // Add user to chat participants if not already added
    if (!course.chatParticipants.includes(userId)) {
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { chatParticipants: userId }
      })
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    })

  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message
    })
  }
}

// Get messages for a specific course
exports.getMessagesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const { page = 1, limit = 50 } = req.query
    const userId = req.user.id
    
    console.log("getMessagesByCourse called with courseId:", courseId)
    console.log("User ID:", userId)

    // Check if course exists and user is enrolled
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    // Check if user is enrolled in the course
    console.log("Checking enrollment for user:", userId)
    console.log("Course students:", course.studentsEnroled)
    console.log("Course instructor:", course.instructor)
    const isEnrolled = course.studentsEnroled.includes(userId) || course.instructor.toString() === userId
    console.log("Is enrolled:", isEnrolled)
    
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course"
      })
    }

    // Get messages with pagination
    console.log("Fetching messages for course:", courseId, "page:", page, "limit:", limit)
    const messages = await Chat.getMessagesByCourse(courseId, parseInt(page), parseInt(limit))
    console.log("Found messages:", messages.length)

    // Get total count for pagination
    const totalMessages = await Chat.countDocuments({ 
      course: courseId, 
      deleted: false 
    })
    console.log("Total messages count:", totalMessages)

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: {
        messages: messages.reverse(), // Reverse to show oldest first
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalMessages / limit),
          totalMessages,
          hasNext: page * limit < totalMessages,
          hasPrev: page > 1
        }
      }
    })

  } catch (error) {
    console.error("Error getting messages:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get messages",
      error: error.message
    })
  }
}

// Edit a message
exports.editMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    const { message } = req.body
    const userId = req.user.id

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message content is required"
      })
    }

    // Find the message
    const existingMessage = await Chat.findById(messageId)
    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      })
    }

    // Check if user is the sender
    if (existingMessage.sender.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own messages"
      })
    }

    // Update the message
    const updatedMessage = await Chat.findByIdAndUpdate(
      messageId,
      { message: message },
      { new: true }
    ).populate('sender', 'firstName lastName image accountType')

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage
    })

  } catch (error) {
    console.error("Error editing message:", error)
    res.status(500).json({
      success: false,
      message: "Failed to edit message",
      error: error.message
    })
  }
}

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    const userId = req.user.id

    // Find the message
    const existingMessage = await Chat.findById(messageId)
    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      })
    }

    // Check if user is the sender or instructor
    const course = await Course.findById(existingMessage.course)
    const isInstructor = course.instructor.toString() === userId
    const isSender = existingMessage.sender.toString() === userId

    if (!isSender && !isInstructor) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own messages"
      })
    }

    // Soft delete the message
    const deletedMessage = await Chat.findByIdAndUpdate(
      messageId,
      { 
        deleted: true,
        deletedAt: new Date(),
        message: "This message was deleted"
      },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deletedMessage
    })

  } catch (error) {
    console.error("Error deleting message:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message
    })
  }
}

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params
    const userId = req.user.id

    const updatedMessage = await Chat.markAsRead(messageId, userId)

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage
    })

  } catch (error) {
    console.error("Error marking message as read:", error)
    res.status(500).json({
      success: false,
      message: "Failed to mark message as read",
      error: error.message
    })
  }
}

// Get online users for a course
exports.getOnlineUsers = async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = req.user.id

    // Check if course exists and user is enrolled
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    // Check if user is enrolled in the course
    const isEnrolled = course.studentsEnroled.includes(userId) || course.instructor.toString() === userId
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course"
      })
    }

    // Get online users from chat participants
    const onlineUsers = await User.find({
      _id: { $in: course.chatParticipants },
      isOnline: true
    }).select('firstName lastName image accountType lastSeen')

    res.status(200).json({
      success: true,
      message: "Online users retrieved successfully",
      data: onlineUsers
    })

  } catch (error) {
    console.error("Error getting online users:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get online users",
      error: error.message
    })
  }
}

// Update user online status
exports.updateOnlineStatus = async (req, res) => {
  try {
    const { isOnline } = req.body
    const userId = req.user.id

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        isOnline: isOnline,
        lastSeen: new Date()
      },
      { new: true }
    ).select('firstName lastName image accountType isOnline lastSeen')

    res.status(200).json({
      success: true,
      message: "Online status updated successfully",
      data: updatedUser
    })

  } catch (error) {
    console.error("Error updating online status:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update online status",
      error: error.message
    })
  }
}
