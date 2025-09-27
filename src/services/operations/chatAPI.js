import { apiConnector } from "../apiConnector"
import { chatEndpoints } from "../apis"

const {
  SEND_MESSAGE,
  GET_MESSAGES_BY_COURSE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
  MARK_AS_READ,
  GET_ONLINE_USERS,
  UPDATE_ONLINE_STATUS
} = chatEndpoints

// Send a message
export const sendMessage = async (data, token, isFileUpload = false) => {
  try {
    let headers = {
      Authorization: `Bearer ${token}`
    }
    
    // For file uploads, let axios set the Content-Type automatically
    // For JSON data, set it explicitly
    if (!isFileUpload) {
      headers["Content-Type"] = "application/json"
    }
    
    const response = await apiConnector("POST", SEND_MESSAGE, data, headers)
    return response
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

// Get messages for a course
export const getMessagesByCourse = async (courseId, token, page = 1, limit = 50) => {
  try {
    console.log("API call - courseId:", courseId, "page:", page, "limit:", limit)
    const url = `${GET_MESSAGES_BY_COURSE}/${courseId}?page=${page}&limit=${limit}`
    console.log("API call - URL:", url)
    
    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`
    })
    console.log("API call - response:", response)
    return response
  } catch (error) {
    console.error("Error getting messages:", error)
    throw error
  }
}

// Edit a message
export const editMessage = async (messageId, data, token) => {
  try {
    const response = await apiConnector("PUT", `${EDIT_MESSAGE}/${messageId}`, data, {
      Authorization: `Bearer ${token}`
    })
    return response
  } catch (error) {
    console.error("Error editing message:", error)
    throw error
  }
}

// Delete a message
export const deleteMessage = async (messageId, token) => {
  try {
    const response = await apiConnector("DELETE", `${DELETE_MESSAGE}/${messageId}`, null, {
      Authorization: `Bearer ${token}`
    })
    return response
  } catch (error) {
    console.error("Error deleting message:", error)
    throw error
  }
}

// Mark message as read
export const markAsRead = async (messageId, token) => {
  try {
    const response = await apiConnector("PUT", `${MARK_AS_READ}/${messageId}`, null, {
      Authorization: `Bearer ${token}`
    })
    return response
  } catch (error) {
    console.error("Error marking message as read:", error)
    throw error
  }
}

// Get online users for a course
export const getOnlineUsers = async (courseId, token) => {
  try {
    const response = await apiConnector("GET", `${GET_ONLINE_USERS}/${courseId}`, null, {
      Authorization: `Bearer ${token}`
    })
    return response
  } catch (error) {
    console.error("Error getting online users:", error)
    throw error
  }
}

// Update user's online status
export const updateOnlineStatus = async (data, token) => {
  try {
    const response = await apiConnector("PUT", UPDATE_ONLINE_STATUS, data, {
      Authorization: `Bearer ${token}`
    })
    return response
  } catch (error) {
    console.error("Error updating online status:", error)
    throw error
  }
}
