import { api } from '../../services/api'

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  async googleLogin(token) {
    const response = await api.post('/auth/google', { token })
    return response.data
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  async resetPassword(token, newPassword) {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    })
    return response.data
  },

  async verifyEmail(token) {
    const response = await api.post('/auth/verify-email', { token })
    return response.data
  },

  async refreshToken(token) {
    const response = await api.post('/auth/refresh', { token })
    return response.data
  },

  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData)
    return response.data
  },

  async changePassword(passwords) {
    const response = await api.post('/auth/change-password', passwords)
    return response.data
  },
}
