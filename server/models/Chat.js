const mongoose = require("mongoose")

// Define the Chat schema for course-based messaging
const chatSchema = new mongoose.Schema({
  // Reference to the course this message belongs to
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  // Reference to the user who sent the message
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  // The actual message content
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000, // Limit message length
  },
  // Message type (text, image, file, etc.)
  messageType: {
    type: String,
    enum: ["text", "image", "file", "system"],
    default: "text",
  },
  // For file/image messages, store the file URL
  fileUrl: {
    type: String,
  },
  // For file messages, store the original filename
  fileName: {
    type: String,
  },
  // Message status
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
  // If this is a reply to another message
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  // If this message was edited
  edited: {
    type: Boolean,
    default: false,
  },
  // Timestamp of last edit
  editedAt: {
    type: Date,
  },
  // If this message was deleted
  deleted: {
    type: Boolean,
    default: false,
  },
  // Timestamp of deletion
  deletedAt: {
    type: Date,
  },
  // Read receipts - array of user IDs who have read this message
  readBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      readAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt
})

// Index for efficient querying
chatSchema.index({ course: 1, createdAt: -1 })
chatSchema.index({ sender: 1 })
chatSchema.index({ status: 1 })

// Virtual for getting sender's name
chatSchema.virtual('senderName').get(function() {
  return `${this.sender.firstName} ${this.sender.lastName}`
})

// Ensure virtual fields are serialized
chatSchema.set('toJSON', { virtuals: true })

// Pre-save middleware to update editedAt when message is edited
chatSchema.pre('save', function(next) {
  if (this.isModified('message') && !this.isNew) {
    this.edited = true
    this.editedAt = new Date()
  }
  next()
})

// Static method to get messages for a course with pagination
chatSchema.statics.getMessagesByCourse = function(courseId, page = 1, limit = 50) {
  const skip = (page - 1) * limit
  return this.find({ 
    course: courseId, 
    deleted: false 
  })
  .populate('sender', 'firstName lastName image accountType')
  .populate('replyTo', 'message sender')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
}

// Static method to mark messages as read
chatSchema.statics.markAsRead = function(messageId, userId) {
  return this.findByIdAndUpdate(
    messageId,
    {
      $addToSet: {
        readBy: {
          user: userId,
          readAt: new Date()
        }
      }
    },
    { new: true }
  )
}

// Export the Chat model
module.exports = mongoose.model("Chat", chatSchema)
