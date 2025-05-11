import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload
      state.user = user
      state.token = token
      state.refreshToken = refreshToken
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { setCredentials, logout, setError, setLoading, updateUser } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthError = (state) => state.auth.error
export const selectIsLoading = (state) => state.auth.isLoading

export default authSlice.reducer
