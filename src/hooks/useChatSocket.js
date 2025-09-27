import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const useChatSocket = (token) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!token) return

    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:4000", {
      auth: {
        token: token
      }
    })

    newSocket.on("connect", () => {
      console.log("Connected to chat server")
      setIsConnected(true)
    })

    newSocket.on("disconnect", () => {
      console.log("Disconnected from chat server")
      setIsConnected(false)
    })

    newSocket.on("error", (error) => {
      console.error("Socket error:", error)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [token])

  return { socket, isConnected }
}
