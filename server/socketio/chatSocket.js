const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Course = require("../models/Course")
const Chat = require("../models/Chat")

// Store active connections by course
const courseConnections = new Map()

// Socket.IO middleware for authentication
const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      return next(new Error('Authentication error: User not found'))
    }

    socket.userId = user._id.toString()
    socket.user = user
    next()
  } catch (error) {
    next(new Error('Authentication error: Invalid token'))
  }
}

// Initialize Socket.IO chat functionality
const initializeChatSocket = (io) => {
  // Apply authentication middleware
  io.use(authenticateSocket)

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.firstName} connected to chat`)

    // Join course room
    socket.on('join-course', async (courseId) => {
      try {
        // Verify user is enrolled in the course
        const course = await Course.findById(courseId)
        if (!course) {
          socket.emit('error', { message: 'Course not found' })
          return
        }

        const isEnrolled = course.studentsEnroled.includes(socket.userId) || 
                          course.instructor.toString() === socket.userId

        if (!isEnrolled) {
          socket.emit('error', { message: 'You are not enrolled in this course' })
          return
        }

        // Join the course room
        socket.join(`course-${courseId}`)
        
        // Update user online status
        await User.findByIdAndUpdate(socket.userId, { 
          isOnline: true,
          lastSeen: new Date()
        })

        // Add user to course chat participants if not already added
        if (!course.chatParticipants.includes(socket.userId)) {
          await Course.findByIdAndUpdate(courseId, {
            $addToSet: { chatParticipants: socket.userId }
          })
        }

        // Store connection info
        if (!courseConnections.has(courseId)) {
          courseConnections.set(courseId, new Set())
        }
        courseConnections.get(courseId).add(socket.id)

        // Notify others in the course that user joined
        socket.to(`course-${courseId}`).emit('user-joined', {
          user: {
            id: socket.user._id,
            firstName: socket.user.firstName,
            lastName: socket.user.lastName,
            image: socket.user.image,
            accountType: socket.user.accountType
          },
          timestamp: new Date()
        })

        // Send online users list to the joining user
        const onlineUsers = await User.find({
          _id: { $in: course.chatParticipants },
          isOnline: true
        }).select('firstName lastName image accountType lastSeen')

        socket.emit('online-users', onlineUsers)

        console.log(`User ${socket.user.firstName} joined course ${courseId}`)
      } catch (error) {
        console.error('Error joining course:', error)
        socket.emit('error', { message: 'Failed to join course' })
      }
    })

    // Handle new message
    socket.on('send-message', async (data) => {
      try {
        const { courseId, message, messageType = 'text', replyTo } = data

        // Verify user is enrolled in the course
        const course = await Course.findById(courseId)
        if (!course) {
          socket.emit('error', { message: 'Course not found' })
          return
        }

        const isEnrolled = course.studentsEnroled.includes(socket.userId) || 
                          course.instructor.toString() === socket.userId

        if (!isEnrolled) {
          socket.emit('error', { message: 'You are not enrolled in this course' })
          return
        }

        // Check if chat is enabled
        if (!course.chatEnabled) {
          socket.emit('error', { message: 'Chat is disabled for this course' })
          return
        }

        // Create the message
        const newMessage = await Chat.create({
          course: courseId,
          sender: socket.userId,
          message: message,
          messageType: messageType,
          replyTo: replyTo || null,
        })

        // Populate sender information
        await newMessage.populate('sender', 'firstName lastName image accountType')

        // Broadcast message to all users in the course room
        io.to(`course-${courseId}`).emit('new-message', {
          message: newMessage,
          timestamp: new Date()
        })

        console.log(`Message sent in course ${courseId} by ${socket.user.firstName}`)
      } catch (error) {
        console.error('Error sending message:', error)
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Handle message editing
    socket.on('edit-message', async (data) => {
      try {
        const { messageId, newMessage } = data

        // Find and update the message
        const updatedMessage = await Chat.findOneAndUpdate(
          { 
            _id: messageId, 
            sender: socket.userId 
          },
          { 
            message: newMessage,
            edited: true,
            editedAt: new Date()
          },
          { new: true }
        ).populate('sender', 'firstName lastName image accountType')

        if (!updatedMessage) {
          socket.emit('error', { message: 'Message not found or you cannot edit this message' })
          return
        }

        // Broadcast edited message to all users in the course room
        io.to(`course-${updatedMessage.course}`).emit('message-edited', {
          message: updatedMessage,
          timestamp: new Date()
        })

        console.log(`Message ${messageId} edited by ${socket.user.firstName}`)
      } catch (error) {
        console.error('Error editing message:', error)
        socket.emit('error', { message: 'Failed to edit message' })
      }
    })

    // Handle message deletion
    socket.on('delete-message', async (data) => {
      try {
        const { messageId } = data

        // Find the message
        const message = await Chat.findById(messageId)
        if (!message) {
          socket.emit('error', { message: 'Message not found' })
          return
        }

        // Check if user can delete (sender or instructor)
        const course = await Course.findById(message.course)
        const isInstructor = course.instructor.toString() === socket.userId
        const isSender = message.sender.toString() === socket.userId

        if (!isSender && !isInstructor) {
          socket.emit('error', { message: 'You cannot delete this message' })
          return
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

        // Broadcast deleted message to all users in the course room
        io.to(`course-${message.course}`).emit('message-deleted', {
          messageId: messageId,
          timestamp: new Date()
        })

        console.log(`Message ${messageId} deleted by ${socket.user.firstName}`)
      } catch (error) {
        console.error('Error deleting message:', error)
        socket.emit('error', { message: 'Failed to delete message' })
      }
    })

    // Handle typing indicator
    socket.on('typing', (data) => {
      const { courseId, isTyping } = data
      socket.to(`course-${courseId}`).emit('user-typing', {
        user: {
          id: socket.user._id,
          firstName: socket.user.firstName,
          lastName: socket.user.lastName
        },
        isTyping: isTyping,
        timestamp: new Date()
      })
    })

    // Handle message read receipts
    socket.on('mark-read', async (data) => {
      try {
        const { messageId } = data

        await Chat.markAsRead(messageId, socket.userId)

        // Broadcast read receipt to sender
        const message = await Chat.findById(messageId)
        if (message) {
          io.to(`course-${message.course}`).emit('message-read', {
            messageId: messageId,
            readBy: {
              id: socket.user._id,
              firstName: socket.user.firstName,
              lastName: socket.user.lastName
            },
            timestamp: new Date()
          })
        }
      } catch (error) {
        console.error('Error marking message as read:', error)
        socket.emit('error', { message: 'Failed to mark message as read' })
      }
    })

    // Handle disconnection
    socket.on('disconnect', async () => {
      try {
        // Update user offline status
        await User.findByIdAndUpdate(socket.userId, { 
          isOnline: false,
          lastSeen: new Date()
        })

        // Remove from course connections
        for (const [courseId, connections] of courseConnections.entries()) {
          if (connections.has(socket.id)) {
            connections.delete(socket.id)
            
            // Notify others in the course that user left
            socket.to(`course-${courseId}`).emit('user-left', {
              user: {
                id: socket.user._id,
                firstName: socket.user.firstName,
                lastName: socket.user.lastName
              },
              timestamp: new Date()
            })

            // If no more connections for this course, remove the entry
            if (connections.size === 0) {
              courseConnections.delete(courseId)
            }
          }
        }

        console.log(`User ${socket.user.firstName} disconnected from chat`)
      } catch (error) {
        console.error('Error handling disconnect:', error)
      }
    })
  })

  return io
}

module.exports = { initializeChatSocket, courseConnections }
