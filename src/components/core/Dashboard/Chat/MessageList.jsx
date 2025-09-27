import { useState } from "react"
import { VscEdit, VscTrash, VscReply, VscCheck } from "react-icons/vsc"

import { formatDistanceToNow } from "date-fns"

export default function MessageList({ messages, currentUserId, isInstructor }) {
  const [editingMessage, setEditingMessage] = useState(null)
  const [editText, setEditText] = useState("")

  console.log("MessageList received messages:", messages)
  console.log("MessageList currentUserId:", currentUserId)
  console.log("MessageList isInstructor:", isInstructor)

  const handleEdit = (message) => {
    setEditingMessage(message._id)
    setEditText(message.message)
  }

  const handleSaveEdit = () => {
    // Handle edit logic here
    console.log("Saving edit:", editText)
    setEditingMessage(null)
    setEditText("")
  }

  const handleDelete = (messageId) => {
    // Handle delete logic here
    console.log("Deleting message:", messageId)
  }

  const handleReply = (message) => {
    // Handle reply logic here
    console.log("Replying to:", message)
  }

  const canEditOrDelete = (message) => {
    return message.sender._id === currentUserId || isInstructor
  }

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-richblack-400">
          <p>No messages to display</p>
          <p className="text-xs">Debug: messages array length is {messages.length}</p>
        </div>
      ) : (
        messages.map((message) => {
        const isCurrentUser = message.sender?._id === currentUserId || message.sender?.id === currentUserId
        console.log("Message:", message, "isCurrentUser:", isCurrentUser, "currentUserId:", currentUserId)
        
        return (
        <div
          key={message._id}
          className={`flex gap-3 ${
            isCurrentUser ? "justify-end" : "justify-start"
          }`}
        >
          {!isCurrentUser && (
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-richblack-600 flex items-center justify-center">
                {message.sender?.image ? (
                  <img
                    src={message.sender.image}
                    alt={message.sender.firstName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-richblack-5">
                    {message.sender?.firstName?.[0]}{message.sender?.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>
          )}

          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              isCurrentUser
                ? "bg-yellow-500 text-richblack-900"
                : "bg-richblack-700 text-richblack-5"
            } ${message.deleted ? "opacity-50" : ""}`}
          >
            {!isCurrentUser && (
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-semibold">
                  {message.sender?.firstName} {message.sender?.lastName}
                </span>
                {message.sender?.accountType === "Instructor" && (
                  <span className="rounded bg-yellow-500 px-1 py-0.5 text-xs font-semibold text-richblack-900">
                    Instructor
                  </span>
                )}
              </div>
            )}

            {editingMessage === message._id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 rounded border border-richblack-500 bg-richblack-600 px-2 py-1 text-sm"
                  autoFocus
                />
                <button
                  onClick={handleSaveEdit}
                  className="rounded p-1 hover:bg-richblack-600"
                >
                  <VscCheck className="text-sm" />
                </button>
                <button
                  onClick={() => {
                    setEditingMessage(null)
                    setEditText("")
                  }}
                  className="rounded p-1 hover:bg-richblack-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                {message.replyTo && (
                  <div className="mb-2 rounded bg-richblack-600 p-2 text-xs">
                    <div className="font-semibold">
                      Replying to {message.replyTo.sender?.firstName}
                    </div>
                    <div className="truncate text-richblack-300">
                      {message.replyTo.message}
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-wrap break-words">
                  {message.message || "Message content not available"}
                </div>

                {message.edited && (
                  <div className="mt-1 text-xs text-richblack-400">
                    (edited)
                  </div>
                )}

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-richblack-400">
                    {formatTime(message.createdAt)}
                  </span>
                  
                  {message.readBy && message.readBy.length > 0 && (
                    <div className="flex items-center gap-1">
                      <VscCheck className="text-xs text-green-400" />
                      <span className="text-xs text-richblack-400">
                        {message.readBy.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {canEditOrDelete(message) && editingMessage !== message._id && (
              <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(message)}
                  className="rounded p-1 text-xs hover:bg-richblack-600"
                  title="Edit message"
                >
                  <VscEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleReply(message)}
                  className="rounded p-1 text-xs hover:bg-richblack-600"
                  title="Reply to message"
                >
                  <VscReply className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="rounded p-1 text-xs hover:bg-richblack-600 text-red-400"
                  title="Delete message"
                >
                  <VscTrash className="text-sm" />
                </button>
              </div>
            )}
          </div>

          {isCurrentUser && (
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-richblack-600 flex items-center justify-center">
                {message.sender?.image ? (
                  <img
                    src={message.sender.image}
                    alt={message.sender.firstName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-richblack-5">
                    {message.sender?.firstName?.[0]}{message.sender?.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        )
      })
      )}
    </div>
  )
}
