# Real-time Chat Community Implementation

This document outlines the implementation of a real-time chat community for students enrolled in the same course.

## Overview

The chat system allows students and instructors to communicate in real-time within course-specific chat rooms. It includes features like message sending, editing, deletion, typing indicators, read receipts, and online user status.

## Database Schema Changes

### Updated User.js Model
```javascript
// Added chat-related fields
isOnline: {
  type: Boolean,
  default: false,
},
lastSeen: {
  type: Date,
  default: Date.now,
},
```

### Updated Course.js Model
```javascript
// Added chat-related fields
chatEnabled: {
  type: Boolean,
  default: true,
},
chatParticipants: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
],
```

### New Chat.js Model
The Chat model includes:
- Course reference
- Sender information
- Message content and type
- File upload support
- Message status and read receipts
- Reply functionality
- Edit and delete capabilities

## API Endpoints

### Chat Routes (`/api/v1/chat`)

1. **POST /send** - Send a message
   - Body: `{ courseId, message, messageType, replyTo }`
   - Files: Optional file upload

2. **GET /course/:courseId** - Get messages for a course
   - Query: `?page=1&limit=50`

3. **PUT /edit/:messageId** - Edit a message
   - Body: `{ message }`

4. **DELETE /delete/:messageId** - Delete a message

5. **PUT /read/:messageId** - Mark message as read

6. **GET /online/:courseId** - Get online users for a course

7. **PUT /status** - Update user's online status
   - Body: `{ isOnline }`

## Socket.IO Events

### Client to Server Events

1. **join-course** - Join a course chat room
   - Data: `{ courseId }`

2. **send-message** - Send a message
   - Data: `{ courseId, message, messageType, replyTo }`

3. **edit-message** - Edit a message
   - Data: `{ messageId, newMessage }`

4. **delete-message** - Delete a message
   - Data: `{ messageId }`

5. **typing** - Send typing indicator
   - Data: `{ courseId, isTyping }`

6. **mark-read** - Mark message as read
   - Data: `{ messageId }`

### Server to Client Events

1. **new-message** - New message received
2. **message-edited** - Message was edited
3. **message-deleted** - Message was deleted
4. **user-joined** - User joined the chat
5. **user-left** - User left the chat
6. **online-users** - List of online users
7. **user-typing** - User typing indicator
8. **message-read** - Message read receipt

## Installation and Setup

### Backend Dependencies
```bash
npm install socket.io multer
```

### Frontend Dependencies
```bash
npm install socket.io-client
```

### Environment Variables
Ensure these are set in your `.env` file:
```
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FOLDER_NAME=your_folder_name
```

## Usage Examples

### Backend Integration
The chat functionality is automatically integrated into your existing Express server. Socket.IO is initialized in `server/index.js`.

### Frontend Integration
Use the provided `ChatSocket` class to integrate with your frontend:

```javascript
import ChatSocket from './frontend-socketio-example.js'

const chatSocket = new ChatSocket()
chatSocket.connect(userToken)
chatSocket.joinCourse(courseId)
chatSocket.sendMessage("Hello everyone!")
```

## Features

### Real-time Messaging
- Instant message delivery
- Message editing and deletion
- File and image sharing
- Reply to messages

### User Management
- Online/offline status
- Last seen timestamps
- User join/leave notifications
- Online users list

### Advanced Features
- Typing indicators
- Read receipts
- Message pagination
- Course-based chat rooms
- Authentication and authorization

### Security
- JWT-based authentication
- Course enrollment verification
- Message ownership validation
- File upload restrictions

## File Structure

```
server/
├── models/
│   ├── User.js (updated)
│   ├── Course.js (updated)
│   └── Chat.js (new)
├── controllers/
│   └── Chat.js (new)
├── routes/
│   └── Chat.js (new)
├── middleware/
│   └── multer.js (new)
├── socketio/
│   └── chatSocket.js (new)
└── index.js (updated)
```

## Testing

### API Testing
Use tools like Postman or curl to test the REST API endpoints.

### Socket.IO Testing
Use the Socket.IO client or browser developer tools to test real-time functionality.

## Deployment Considerations

1. **Scaling**: Consider using Redis for Socket.IO scaling across multiple servers
2. **File Storage**: Ensure proper file upload handling and storage
3. **Rate Limiting**: Implement rate limiting for message sending
4. **Message History**: Consider implementing message archiving for old courses

## Troubleshooting

### Common Issues

1. **Socket Connection Failed**: Check JWT token and server URL
2. **Messages Not Sending**: Verify course enrollment and chat permissions
3. **File Upload Issues**: Check multer configuration and file size limits
4. **Authentication Errors**: Ensure JWT secret is properly configured

### Debug Mode
Enable Socket.IO debug mode by setting:
```javascript
localStorage.debug = 'socket.io-client:*'
```

## Future Enhancements

1. **Message Reactions**: Add emoji reactions to messages
2. **Voice Messages**: Support for audio message recording
3. **Message Search**: Full-text search within course chats
4. **Push Notifications**: Browser notifications for new messages
5. **Message Threading**: Better organization of replies
6. **Chat Moderation**: Admin tools for chat management
