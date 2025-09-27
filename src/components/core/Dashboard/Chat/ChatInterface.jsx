// // import { useEffect, useState, useRef } from "react"
// // import { useSelector } from "react-redux"
// // import { VscSend, VscSmiley, VscClippy, VscKebabVertical } from "react-icons/vsc"

// // import { useChatSocket } from "../../../../hooks/useChatSocket"
// // import { sendMessage, getMessagesByCourse } from "../../../../services/operations/chatAPI"
// // import EmojiPicker from "./EmojiPicker"
// // import MessageList from "./MessageList"
// // import OnlineUsers from "./OnlineUsers"
// // import TypingIndicator from "./TypingIndicator"

// // export default function ChatInterface({ courseId, isInstructor, isStudent }) {
// //   const { token } = useSelector((state) => state.auth)
// //   const { user } = useSelector((state) => state.profile)
// //   const [message, setMessage] = useState("")
// //   const [messages, setMessages] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [sending, setSending] = useState(false)
// //   const [typingUsers, setTypingUsers] = useState([])
// //   const [onlineUsers, setOnlineUsers] = useState([])
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
// //   const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  
// //   const messagesEndRef = useRef(null)
// //   const fileInputRef = useRef(null)
// //   const typingTimeoutRef = useRef(null)

// //   // Initialize chat socket
// //   const { socket, isConnected } = useChatSocket(token)

// //   // Auto-scroll to bottom when new messages arrive
// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
// //   }

// //   // Load messages when course changes
// //   useEffect(() => {
// //     if (courseId && token) {
// //       loadMessages()
// //     }
// //   }, [courseId, token])

// //   // Socket event handlers
// //   useEffect(() => {
// //     if (!socket) return

// //     const handleNewMessage = (data) => {
// //       setMessages(prev => [...prev, data.message])
// //       scrollToBottom()
// //     }

// //     const handleMessageEdited = (data) => {
// //       setMessages(prev => 
// //         prev.map(msg => 
// //           msg._id === data.message._id ? data.message : msg
// //         )
// //       )
// //     }

// //     const handleMessageDeleted = (data) => {
// //       setMessages(prev => 
// //         prev.map(msg => 
// //           msg._id === data.messageId 
// //             ? { ...msg, deleted: true, message: "This message was deleted" }
// //             : msg
// //         )
// //       )
// //     }

// //     const handleUserTyping = (data) => {
// //       if (data.user.id !== user._id) {
// //         setTypingUsers(prev => {
// //           const filtered = prev.filter(u => u.id !== data.user.id)
// //           return data.isTyping 
// //             ? [...filtered, data.user]
// //             : filtered
// //         })
// //       }
// //     }

// //     const handleOnlineUsers = (users) => {
// //       setOnlineUsers(users)
// //     }

// //     const handleUserJoined = (data) => {
// //       // Show notification or update online users
// //       console.log("User joined:", data.user)
// //     }

// //     const handleUserLeft = (data) => {
// //       // Show notification or update online users
// //       console.log("User left:", data.user)
// //     }

// //     // Join course room
// //     socket.emit("join-course", courseId)

// //     // Set up event listeners
// //     socket.on("new-message", handleNewMessage)
// //     socket.on("message-edited", handleMessageEdited)
// //     socket.on("message-deleted", handleMessageDeleted)
// //     socket.on("user-typing", handleUserTyping)
// //     socket.on("online-users", handleOnlineUsers)
// //     socket.on("user-joined", handleUserJoined)
// //     socket.on("user-left", handleUserLeft)

// //     return () => {
// //       socket.off("new-message", handleNewMessage)
// //       socket.off("message-edited", handleMessageEdited)
// //       socket.off("message-deleted", handleMessageDeleted)
// //       socket.off("user-typing", handleUserTyping)
// //       socket.off("online-users", handleOnlineUsers)
// //       socket.off("user-joined", handleUserJoined)
// //       socket.off("user-left", handleUserLeft)
// //     }
// //   }, [socket, courseId, user._id])

// //   const loadMessages = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await getMessagesByCourse(courseId, token)
// //       if (response?.data?.messages) {
// //         setMessages(response.data.messages)
// //         scrollToBottom()
// //       }
// //     } catch (error) {
// //       console.error("Error loading messages:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault()
// //     if (!message.trim() || sending) return

// //     try {
// //       setSending(true)
// //       const response = await sendMessage({
// //         courseId,
// //         message: message.trim(),
// //         messageType: "text"
// //       }, token)

// //       if (response?.data) {
// //         setMessage("")
// //         // Clear typing indicator
// //         if (socket) {
// //           socket.emit("typing", { courseId, isTyping: false })
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error)
// //     } finally {
// //       setSending(false)
// //     }
// //   }

// //   const handleTyping = (e) => {
// //     setMessage(e.target.value)
    
// //     if (socket) {
// //       // Clear existing timeout
// //       if (typingTimeoutRef.current) {
// //         clearTimeout(typingTimeoutRef.current)
// //       }

// //       // Send typing indicator
// //       socket.emit("typing", { courseId, isTyping: true })

// //       // Stop typing after 3 seconds of inactivity
// //       typingTimeoutRef.current = setTimeout(() => {
// //         socket.emit("typing", { courseId, isTyping: false })
// //       }, 3000)
// //     }
// //   }

// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0]
// //     if (!file) return

// //     // Handle file upload logic here
// //     console.log("File selected:", file)
// //   }

// //   const handleEmojiSelect = (emoji) => {
// //     setMessage(prev => prev + emoji)
// //     setShowEmojiPicker(false)
// //   }

// //   return (
// //     <div className="flex h-full flex-col bg-richblack-900">
// //       {/* Chat Header */}
// //       <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-800 p-4">
// //         <div className="flex items-center gap-3">
// //           <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
// //             <span className="text-sm font-bold text-richblack-900">C</span>
// //           </div>
// //           <div>
// //             <h3 className="font-semibold text-richblack-5">Course Chat</h3>
// //             <p className="text-xs text-richblack-300">
// //               {isConnected ? "Connected" : "Connecting..."}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <button
// //             onClick={() => setShowOnlineUsers(!showOnlineUsers)}
// //             className="rounded-lg p-2 text-richblack-300 hover:bg-richblack-700"
// //           >
// //             <VscKebabVertical className="text-lg" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Online Users Sidebar */}
// //       {showOnlineUsers && (
// //         <OnlineUsers 
// //           onlineUsers={onlineUsers}
// //           onClose={() => setShowOnlineUsers(false)}
// //         />
// //       )}

// //       {/* Messages Area */}
// //       <div className="flex-1 overflow-hidden">
// //         <div className="h-full overflow-y-auto p-4">
// //           {loading ? (
// //             <div className="flex h-full items-center justify-center">
// //               <div className="spinner"></div>
// //             </div>
// //           ) : messages.length === 0 ? (
// //             <div className="flex h-full items-center justify-center">
// //               <div className="text-center">
// //                 <div className="mb-4 text-6xl">💬</div>
// //                 <h3 className="mb-2 text-xl font-semibold text-richblack-5">
// //                   No messages yet
// //                 </h3>
// //                 <p className="text-richblack-300">
// //                   Start the conversation by sending a message!
// //                 </p>
// //               </div>
// //             </div>
// //           ) : (
// //             <>
// //               <MessageList 
// //                 messages={messages}
// //                 currentUserId={user._id}
// //                 isInstructor={isInstructor}
// //               />
// //               <TypingIndicator typingUsers={typingUsers} />
// //               <div ref={messagesEndRef} />
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Message Input */}
// //       <div className="border-t border-richblack-700 bg-richblack-800 p-4">
// //         <form onSubmit={handleSendMessage} className="flex items-center gap-2">
// //           <div className="flex-1">
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 value={message}
// //                 onChange={handleTyping}
// //                 placeholder="Type a message..."
// //                 className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
// //                 disabled={sending}
// //               />
// //               <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// //                   className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
// //                 >
// //                   <VscSmiley className="text-lg" />
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => fileInputRef.current?.click()}
// //                   className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
// //                 >
// //                   <VscClippy className="text-lg" />
// //                 </button>
// //               </div>
// //             </div>
// //             <input
// //               ref={fileInputRef}
// //               type="file"
// //               onChange={handleFileUpload}
// //               className="hidden"
// //               accept="image/*,.pdf,.doc,.docx,.txt"
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             disabled={!message.trim() || sending}
// //             className="rounded-lg bg-yellow-500 px-4 py-2 text-richblack-900 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             <VscSend className="text-lg" />
// //           </button>
// //         </form>
        
// //         {/* Emoji Picker */}
// //         {showEmojiPicker && (
// //           <EmojiPicker
// //             onEmojiSelect={handleEmojiSelect}
// //             onClose={() => setShowEmojiPicker(false)}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   )
// // }



// import { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { VscSend, VscSmiley, VscClippy, VscKebabVertical } from "react-icons/vsc";

// import { useChatSocket } from "../../../../hooks/useChatSocket";
// import { sendMessage, getMessagesByCourse } from "../../../../services/operations/chatAPI";
// import EmojiPicker from "./EmojiPicker";
// import MessageList from "./MessageList";
// import OnlineUsers from "./OnlineUsers";
// import TypingIndicator from "./TypingIndicator";

// export default function ChatInterface({ courseId, isInstructor, isStudent }) {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
  
//   console.log("ChatInterface props:", { courseId, isInstructor, isStudent });
//   console.log("ChatInterface user:", user);
//   console.log("ChatInterface token:", token ? "Present" : "Missing");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showOnlineUsers, setShowOnlineUsers] = useState(false);

//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   // Initialize chat socket
//   const { socket, isConnected } = useChatSocket(token);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Load messages when course changes
//   useEffect(() => {
//     if (courseId && token) {
//       console.log("Loading messages for course:", courseId);
//       loadMessages();
//     }
//   }, [courseId, token]);

//   // Socket event handlers
//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (data) => {
//       setMessages((prev) => [...prev, data.message]);
//       scrollToBottom();
//     };

//     const handleMessageEdited = (data) => {
//       setMessages((prev) =>
//         prev.map((msg) => (msg._id === data.message._id ? data.message : msg))
//       );
//     };

//     const handleMessageDeleted = (data) => {
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg._id === data.messageId
//             ? { ...msg, deleted: true, message: "This message was deleted" }
//             : msg
//         )
//       );
//     };

//     const handleUserTyping = (data) => {
//       if (data.user.id !== user._id) {
//         setTypingUsers((prev) => {
//           const filtered = prev.filter((u) => u.id !== data.user.id);
//           return data.isTyping ? [...filtered, data.user] : filtered;
//         });
//       }
//     };

//     const handleOnlineUsers = (users) => setOnlineUsers(users);

//     // Join course room
//     socket.emit("join-course", courseId);

//     socket.on("new-message", handleNewMessage);
//     socket.on("message-edited", handleMessageEdited);
//     socket.on("message-deleted", handleMessageDeleted);
//     socket.on("user-typing", handleUserTyping);
//     socket.on("online-users", handleOnlineUsers);

//     return () => {
//       socket.off("new-message", handleNewMessage);
//       socket.off("message-edited", handleMessageEdited);
//       socket.off("message-deleted", handleMessageDeleted);
//       socket.off("user-typing", handleUserTyping);
//       socket.off("online-users", handleOnlineUsers);
//     };
//   }, [socket, courseId, user._id]);

//   const loadMessages = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching messages for course:", courseId);
//       const response = await getMessagesByCourse(courseId, token);
//       console.log("Messages response:", response);
      
//       if (response?.data?.messages) {
//         console.log("Setting messages:", response.data.messages);
//         setMessages(response.data.messages);
//         scrollToBottom();
//       } else if (response?.data) {
//         console.log("Response data structure:", response.data);
//         // Try different possible data structures
//         if (Array.isArray(response.data)) {
//           setMessages(response.data);
//         } else {
//           setMessages([]);
//         }
//         scrollToBottom();
//       } else {
//         console.log("No messages found in response");
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || sending) return;

//     try {
//       setSending(true);
//       console.log("Sending message:", message.trim());
//       const response = await sendMessage(
//         {
//           courseId,
//           message: message.trim(),
//           messageType: "text",
//         },
//         token,
//         false // Not a file upload
//       );

//       console.log("Send message response:", response);
//       if (response?.data) {
//         console.log("Message sent successfully, adding to local state");
//         // Add the message to local state immediately for better UX
//         const newMessage = {
//           _id: response.data._id || Date.now().toString(),
//           message: message.trim(),
//           sender: {
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             image: user.image,
//             accountType: user.accountType
//           },
//           createdAt: new Date().toISOString(),
//           messageType: "text"
//         };
//         setMessages(prev => [...prev, newMessage]);
//         setMessage("");
//         if (socket) socket.emit("typing", { courseId, isTyping: false });
//         scrollToBottom();
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleTyping = (e) => {
//     setMessage(e.target.value);

//     if (socket) {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//       socket.emit("typing", { courseId, isTyping: true });

//       typingTimeoutRef.current = setTimeout(() => {
//         socket.emit("typing", { courseId, isTyping: false });
//       }, 3000);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("courseId", courseId);
//     formData.append("message", file.name); // Use filename as message
//     formData.append("messageType", file.type.startsWith('image/') ? "image" : "file");

//     try {
//       setSending(true);
//       const response = await sendMessage(formData, token, true); // File upload

//       if (response?.data) {
//         // Clear the file input
//         e.target.value = "";
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleEmojiSelect = (emoji) => {
//     setMessage((prev) => prev + emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className="flex h-full flex-col bg-richblack-900">
//       {/* Chat Header */}
//       <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-800 p-4">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
//             <span className="text-sm font-bold text-richblack-900">C</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-richblack-5">Course Chat</h3>
//             <p className="text-xs text-richblack-300">
//               {isConnected ? "Connected" : "Connecting..."}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowOnlineUsers(!showOnlineUsers)}
//             className="rounded-lg p-2 text-richblack-300 hover:bg-richblack-700"
//           >
//             <VscKebabVertical className="text-lg" />
//           </button>
//         </div>
//       </div>

//       {showOnlineUsers && (
//         <OnlineUsers onlineUsers={onlineUsers} onClose={() => setShowOnlineUsers(false)} />
//       )}

//       {/* Messages Area */}
//       <div className="flex-1 overflow-hidden">
//         <div className="h-full overflow-y-auto p-4">
//           {loading ? (
//             <div className="flex h-full items-center justify-center">
//               <div className="spinner"></div>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="flex h-full items-center justify-center">
//               <div className="text-center">
//                 <div className="mb-4 text-6xl">💬</div>
//                 <h3 className="mb-2 text-xl font-semibold text-richblack-5">
//                   No messages yet
//                 </h3>
//                 <p className="text-richblack-300">
//                   Start the conversation by sending a message!
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <>
//               <MessageList messages={messages} currentUserId={user._id} isInstructor={isInstructor} />
//               <TypingIndicator typingUsers={typingUsers} />
//               <div ref={messagesEndRef} />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Message Input */}
//       <div className="border-t border-richblack-700 bg-richblack-800 p-4">
//         <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={handleTyping}
//                 placeholder="Type a message..."
//                 className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
//                 disabled={sending}
//               />
//               <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                   className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
//                 >
//                   <VscSmiley className="text-lg" />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
//                 >
//                   <VscClippy className="text-lg" />
//                 </button>
//               </div>
//             </div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               onChange={handleFileUpload}
//               className="hidden"
//               accept="image/*,.pdf,.doc,.docx,.txt"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={!message.trim() || sending}
//             className="rounded-lg bg-yellow-500 px-4 py-2 text-richblack-900 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <VscSend className="text-lg" />
//           </button>
//         </form>

//         {showEmojiPicker && (
//           <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
//         )}
//       </div>
//     </div>
//   );
// }






import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { VscSend, VscSmiley, VscClippy, VscKebabVertical } from "react-icons/vsc";
import { useChatSocket } from "../../../../hooks/useChatSocket";
import { sendMessage, getMessagesByCourse } from "../../../../services/operations/chatAPI";
import EmojiPicker from "./EmojiPicker";
import OnlineUsers from "./OnlineUsers";
import TypingIndicator from "./TypingIndicator";
import MessageList from "./MessageList"; // Assuming this is the correct import path

export default function ChatInterface({ courseId, isInstructor, isStudent }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  console.log("ChatInterface props:", { courseId, isInstructor, isStudent });
  console.log("ChatInterface user:", user);
  console.log("ChatInterface token:", token ? "Present" : "Missing");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const latestRequestRef = useRef(null);

  const { socket, isConnected } = useChatSocket(token);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (courseId && token) {
      console.log("Loading messages for course:", courseId);
      loadMessages();
    }
  }, [courseId, token]);

  useEffect(() => {
    console.log("Messages state updated:", messages);
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      console.log("New message received:", data);
      setMessages((prev) => [...prev, data.message]);
      scrollToBottom();
    };

    const handleMessageEdited = (data) => {
      console.log("Message edited:", data);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === data.message._id ? data.message : msg))
      );
    };

    const handleMessageDeleted = (data) => {
      console.log("Message deleted:", data);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, deleted: true, message: "This message was deleted" }
            : msg
        )
      );
    };

    const handleUserTyping = (data) => {
      if (data.user.id !== user._id) {
        setTypingUsers((prev) => {
          const filtered = prev.filter((u) => u.id !== data.user.id);
          return data.isTyping ? [...filtered, data.user] : filtered;
        });
      }
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.emit("join-course", courseId);

    socket.on("new-message", handleNewMessage);
    socket.on("message-edited", handleMessageEdited);
    socket.on("message-deleted", handleMessageDeleted);
    socket.on("user-typing", handleUserTyping);
    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("message-edited", handleMessageEdited);
      socket.off("message-deleted", handleMessageDeleted);
      socket.off("user-typing", handleUserTyping);
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket, courseId, user._id]);

//   const loadMessages = async () => {
//     const requestId = Date.now();
//     latestRequestRef.current = requestId;
//     try {
//       setLoading(true);
//       console.log("Fetching messages for course:", courseId);
//       const response = await getMessagesByCourse(courseId, token);
//       console.log("Messages response:", response);

//       if (latestRequestRef.current === requestId) {
//         if (response?.data?.messages) {
//           console.log("Setting messages:", response.data.messages);
//           setMessages(response.data.messages);
//           console.log("Messages state after set:", messages); // Debug immediate state
//           scrollToBottom();
//         } else if (response?.data) {
//           console.log("Response data structure:", response.data);
//           if (Array.isArray(response.data)) {
//             setMessages(response.data);
//           } else {
//             setMessages([]);
//           }
//           scrollToBottom();
//         } else {
//           console.log("No messages found in response");
//           setMessages([]);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     } finally {
//       if (latestRequestRef.current === requestId) {
//         setLoading(false);
//       }
//     }
//   };


const loadMessages = async () => {
    const requestId = Date.now();
    latestRequestRef.current = requestId;
    try {
      setLoading(true);
      console.log("Fetching messages for course:", courseId);
      const response = await getMessagesByCourse(courseId, token);
      console.log("Messages response full:", response);
  
      if (latestRequestRef.current === requestId) {
        if (response?.data?.data?.messages) {
          console.log("Setting messages:", response.data.data.messages);
          setMessages(response.data.data.messages);
        } else if (response?.data?.messages) {
          console.log("Setting messages (direct):", response.data.messages);
          setMessages(response.data.messages);
        } else {
          console.log("No messages found in response");
          setMessages([]);
        }
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      if (latestRequestRef.current === requestId) {
        setLoading(false);
      }
    }
  };
   const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    try {
      setSending(true);
      console.log("Sending message:", message.trim());
      const response = await sendMessage(
        { courseId, message: message.trim(), messageType: "text" },
        token,
        false
      );

      console.log("Send message response:", response);
      if (response?.data) {
        const newMessage = {
          _id: response.data._id || Date.now().toString(),
          message: message.trim(),
          sender: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            accountType: user.accountType,
          },
          createdAt: new Date().toISOString(),
          messageType: "text",
          senderName: `${user.firstName} ${user.lastName}`,
        };
        setMessages((prev) => [...prev, newMessage]);
        setMessage("");
        if (socket) socket.emit("typing", { courseId, isTyping: false });
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (socket) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      socket.emit("typing", { courseId, isTyping: true });
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", { courseId, isTyping: false });
      }, 3000);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);
    formData.append("message", file.name);
    formData.append("messageType", file.type.startsWith("image/") ? "image" : "file");

    try {
      setSending(true);
      const response = await sendMessage(formData, token, true);

      if (response?.data) {
        e.target.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setSending(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-full flex-col bg-richblack-900">
      <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-sm font-bold text-richblack-900">C</span>
          </div>
          <div>
            <h3 className="font-semibold text-richblack-5">Course Chat</h3>
            <p className="text-xs text-richblack-300">
              {isConnected ? "Connected" : "Connecting..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            className="rounded-lg p-2 text-richblack-300 hover:bg-richblack-700"
          >
            <VscKebabVertical className="text-lg" />
          </button>
        </div>
      </div>

      {showOnlineUsers && (
        <OnlineUsers onlineUsers={onlineUsers} onClose={() => setShowOnlineUsers(false)} />
      )}

      <div className="flex-1" style={{ overflow: "visible", minHeight: "300px" }}>
        <div className="h-full overflow-y-auto p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="spinner"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">💬</div>
                <h3 className="mb-2 text-xl font-semibold text-richblack-5">
                  No messages yet
                </h3>
                <p className="text-richblack-300">
                  Start the conversation by sending a message!
                </p>
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages} currentUserId={user?._id} isInstructor={isInstructor} />
              <TypingIndicator typingUsers={typingUsers} />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="border-t border-richblack-700 bg-richblack-800 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
                disabled={sending}
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
                >
                  <VscSmiley className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded p-1 text-richblack-400 hover:bg-richblack-600"
                >
                  <VscClippy className="text-lg" />
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim() || sending}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-richblack-900 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <VscSend className="text-lg" />
          </button>
        </form>

        {showEmojiPicker && (
          <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
        )}
      </div>
    </div>
  );
}