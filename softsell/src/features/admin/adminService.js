import { api } from '../../services/api'

export const adminService = {
  // User Management
  async getUsers(params) {
    const response = await api.get('/admin/users', { params })
    return response.data
  },

  async updateUser(id, data) {
    const response = await api.put(`/admin/users/${id}`, data)
    return response.data
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },

  // License Management
  async getPendingLicenses(params) {
    const response = await api.get('/admin/licenses/pending', { params })
    return response.data
  },

  async approveLicense(id) {
    const response = await api.post(`/admin/licenses/${id}/approve`)
    return response.data
  },

  async rejectLicense(id, reason) {
    const response = await api.post(`/admin/licenses/${id}/reject`, { reason })
    return response.data
  },

  // Analytics
  async getDashboardStats() {
    const response = await api.get('/admin/stats/dashboard')
    return response.data
  },

  async getLicenseStats() {
    const response = await api.get('/admin/stats/licenses')
    return response.data
  },

  async getUserStats() {
    const response = await api.get('/admin/stats/users')
    return response.data
  },

  async getRevenueStats() {
    const response = await api.get('/admin/stats/revenue')
    return response.data
  },
}
