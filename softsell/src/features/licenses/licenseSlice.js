import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  licenses: [],
  activeLicense: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    type: 'all',
    sortBy: 'newest',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

export const licenseSlice = createSlice({
  name: 'licenses',
  initialState,
  reducers: {
    setLicenses: (state, action) => {
      state.licenses = action.payload
    },
    setActiveLicense: (state, action) => {
      state.activeLicense = action.payload
    },
    addLicense: (state, action) => {
      state.licenses.unshift(action.payload)
    },
    updateLicense: (state, action) => {
      const index = state.licenses.findIndex((license) => license.id === action.payload.id)
      if (index !== -1) {
        state.licenses[index] = action.payload
      }
    },
    removeLicense: (state, action) => {
      state.licenses = state.licenses.filter((license) => license.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.pagination = initialState.pagination
    },
  },
})

export const {
  setLicenses,
  setActiveLicense,
  addLicense,
  updateLicense,
  removeLicense,
  setLoading,
  setError,
  setFilters,
  setPagination,
  resetFilters,
} = licenseSlice.actions

export const selectLicenses = (state) => state.licenses.licenses
export const selectActiveLicense = (state) => state.licenses.activeLicense
export const selectLicenseLoading = (state) => state.licenses.isLoading
export const selectLicenseError = (state) => state.licenses.error
export const selectLicenseFilters = (state) => state.licenses.filters
export const selectLicensePagination = (state) => state.licenses.pagination

export default licenseSlice.reducer
