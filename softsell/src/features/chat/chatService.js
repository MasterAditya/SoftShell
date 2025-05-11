import { api } from '../../services/api'

export const chatService = {
  async getMessages(conversationId) {
    const response = await api.get(`/chat/${conversationId}`)
    return response.data
  },

  async sendMessage(conversationId, message) {
    const response = await api.post(`/chat/${conversationId}`, { message })
    return response.data
  },

  async createConversation() {
    const response = await api.post('/chat')
    return response.data
  },

  async markAsRead(conversationId) {
    const response = await api.put(`/chat/${conversationId}/read`)
    return response.data
  },

  async getUnreadCount() {
    const response = await api.get('/chat/unread')
    return response.data
  },
}
