import { api } from '../../services/api'

export const licenseService = {
  async getLicenses(params) {
    const response = await api.get('/licenses', { params })
    return response.data
  },

  async getLicenseById(id) {
    const response = await api.get(`/licenses/${id}`)
    return response.data
  },

  async createLicense(data) {
    const response = await api.post('/licenses', data)
    return response.data
  },

  async updateLicense(id, data) {
    const response = await api.put(`/licenses/${id}`, data)
    return response.data
  },

  async deleteLicense(id) {
    const response = await api.delete(`/licenses/${id}`)
    return response.data
  },

  async validateLicense(data) {
    const response = await api.post('/licenses/validate', data)
    return response.data
  },

  async submitForReview(id) {
    const response = await api.post(`/licenses/${id}/review`)
    return response.data
  },

  async acceptOffer(id) {
    const response = await api.post(`/licenses/${id}/accept`)
    return response.data
  },

  async rejectOffer(id, reason) {
    const response = await api.post(`/licenses/${id}/reject`, { reason })
    return response.data
  },

  async getLicenseTypes() {
    const response = await api.get('/licenses/types')
    return response.data
  },

  async getLicenseHistory(id) {
    const response = await api.get(`/licenses/${id}/history`)
    return response.data
  },
}
