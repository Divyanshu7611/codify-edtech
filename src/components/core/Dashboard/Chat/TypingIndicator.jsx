import { useEffect, useState } from "react"

export default function TypingIndicator({ typingUsers }) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (typingUsers.length === 0) return null

  return (
    <div className="mb-4 flex items-center gap-2 text-richblack-400">
      <div className="flex gap-1">
        {typingUsers.map((user, index) => (
          <span key={user.id} className="text-sm">
            {user.firstName}
            {index < typingUsers.length - 1 && ", "}
          </span>
        ))}
      </div>
      <span className="text-sm">
        {typingUsers.length === 1 ? "is" : "are"} typing
      </span>
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce"></div>
        <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}
