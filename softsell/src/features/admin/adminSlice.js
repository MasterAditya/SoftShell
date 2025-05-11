import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  pendingLicenses: [],
  stats: {
    dashboard: null,
    licenses: null,
    users: null,
    revenue: null,
  },
  loading: false,
  error: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setPendingLicenses: (state, action) => {
      state.pendingLicenses = action.payload
    },
    setDashboardStats: (state, action) => {
      state.stats.dashboard = action.payload
    },
    setLicenseStats: (state, action) => {
      state.stats.licenses = action.payload
    },
    setUserStats: (state, action) => {
      state.stats.users = action.payload
    },
    setRevenueStats: (state, action) => {
      state.stats.revenue = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setUsers,
  setPendingLicenses,
  setDashboardStats,
  setLicenseStats,
  setUserStats,
  setRevenueStats,
  setLoading,
  setError,
} = adminSlice.actions

export const selectUsers = (state) => state.admin.users
export const selectPendingLicenses = (state) => state.admin.pendingLicenses
export const selectDashboardStats = (state) => state.admin.stats.dashboard
export const selectLicenseStats = (state) => state.admin.stats.licenses
export const selectUserStats = (state) => state.admin.stats.users
export const selectRevenueStats = (state) => state.admin.stats.revenue
export const selectLoading = (state) => state.admin.loading
export const selectError = (state) => state.admin.error

export default adminSlice.reducer
