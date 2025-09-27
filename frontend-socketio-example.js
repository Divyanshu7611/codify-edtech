// Frontend Socket.IO Client Example
// This file shows how to integrate Socket.IO on the frontend

import { io } from 'socket.io-client'

class ChatSocket {
  constructor() {
    this.socket = null
    this.isConnected = false
    this.currentCourseId = null
  }

  // Initialize socket connection
  connect(token) {
    this.socket = io('http://localhost:4000', {
      auth: {
        token: token
      }
    })

    this.socket.on('connect', () => {
      console.log('Connected to chat server')
      this.isConnected = true
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server')
      this.isConnected = false
    })

    this.socket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    // Set up event listeners
    this.setupEventListeners()
  }

  // Join a course chat room
  joinCourse(courseId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-course', courseId)
      this.currentCourseId = courseId
    }
  }

  // Send a message
  sendMessage(message, messageType = 'text', replyTo = null) {
    if (this.socket && this.isConnected && this.currentCourseId) {
      this.socket.emit('send-message', {
        courseId: this.currentCourseId,
        message: message,
        messageType: messageType,
        replyTo: replyTo
      })
    }
  }

  // Edit a message
  editMessage(messageId, newMessage) {
    if (this.socket && this.isConnected) {
      this.socket.emit('edit-message', {
        messageId: messageId,
        newMessage: newMessage
      })
    }
  }

  // Delete a message
  deleteMessage(messageId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('delete-message', {
        messageId: messageId
      })
    }
  }

  // Send typing indicator
  sendTyping(isTyping) {
    if (this.socket && this.isConnected && this.currentCourseId) {
      this.socket.emit('typing', {
        courseId: this.currentCourseId,
        isTyping: isTyping
      })
    }
  }

  // Mark message as read
  markAsRead(messageId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('mark-read', {
        messageId: messageId
      })
    }
  }

  // Set up event listeners
  setupEventListeners() {
    // New message received
    this.socket.on('new-message', (data) => {
      console.log('New message:', data.message)
      // Handle new message in your UI
      this.handleNewMessage(data.message)
    })

    // Message edited
    this.socket.on('message-edited', (data) => {
      console.log('Message edited:', data.message)
      // Handle message edit in your UI
      this.handleMessageEdited(data.message)
    })

    // Message deleted
    this.socket.on('message-deleted', (data) => {
      console.log('Message deleted:', data.messageId)
      // Handle message deletion in your UI
      this.handleMessageDeleted(data.messageId)
    })

    // User joined
    this.socket.on('user-joined', (data) => {
      console.log('User joined:', data.user)
      // Handle user joined in your UI
      this.handleUserJoined(data.user)
    })

    // User left
    this.socket.on('user-left', (data) => {
      console.log('User left:', data.user)
      // Handle user left in your UI
      this.handleUserLeft(data.user)
    })

    // Online users list
    this.socket.on('online-users', (users) => {
      console.log('Online users:', users)
      // Handle online users in your UI
      this.handleOnlineUsers(users)
    })

    // User typing
    this.socket.on('user-typing', (data) => {
      console.log('User typing:', data.user, data.isTyping)
      // Handle typing indicator in your UI
      this.handleUserTyping(data.user, data.isTyping)
    })

    // Message read receipt
    this.socket.on('message-read', (data) => {
      console.log('Message read:', data.messageId, data.readBy)
      // Handle read receipt in your UI
      this.handleMessageRead(data.messageId, data.readBy)
    })
  }

  // UI Handler methods (implement these based on your UI framework)
  handleNewMessage(message) {
    // Add message to chat UI
    // Example: addMessageToChat(message)
  }

  handleMessageEdited(message) {
    // Update message in chat UI
    // Example: updateMessageInChat(message)
  }

  handleMessageDeleted(messageId) {
    // Remove or mark message as deleted in chat UI
    // Example: removeMessageFromChat(messageId)
  }

  handleUserJoined(user) {
    // Show user joined notification
    // Example: showUserJoinedNotification(user)
  }

  handleUserLeft(user) {
    // Show user left notification
    // Example: showUserLeftNotification(user)
  }

  handleOnlineUsers(users) {
    // Update online users list in UI
    // Example: updateOnlineUsersList(users)
  }

  handleUserTyping(user, isTyping) {
    // Show/hide typing indicator
    // Example: showTypingIndicator(user, isTyping)
  }

  handleMessageRead(messageId, readBy) {
    // Update read status in UI
    // Example: updateMessageReadStatus(messageId, readBy)
  }

  // Disconnect from socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
      this.currentCourseId = null
    }
  }
}

// Usage example:
// const chatSocket = new ChatSocket()
// chatSocket.connect(userToken)
// chatSocket.joinCourse(courseId)
// chatSocket.sendMessage("Hello everyone!")

export default ChatSocket
