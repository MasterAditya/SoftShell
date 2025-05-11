import { describe, it, expect } from 'vitest'
import reducer, {
  setLicenses,
  addLicense,
  updateLicense,
  removeLicense,
  setLoading,
  setError,
} from '../licenseSlice'

describe('license reducer', () => {
  const initialState = {
    licenses: [],
    loading: false,
    error: null,
    filters: {
      status: 'all',
      sortBy: 'newest',
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setLicenses', () => {
    const licenses = [
      { id: 1, name: 'License 1' },
      { id: 2, name: 'License 2' },
    ]
    const actual = reducer(initialState, setLicenses(licenses))
    expect(actual.licenses).toEqual(licenses)
  })

  it('should handle addLicense', () => {
    const license = { id: 1, name: 'New License' }
    const actual = reducer(initialState, addLicense(license))
    expect(actual.licenses).toEqual([license])
  })

  it('should handle updateLicense', () => {
    const initial = {
      ...initialState,
      licenses: [
        { id: 1, name: 'Old Name' },
        { id: 2, name: 'License 2' },
      ],
    }
    const updated = { id: 1, name: 'New Name' }
    const actual = reducer(initial, updateLicense(updated))
    expect(actual.licenses[0].name).toEqual('New Name')
  })

  it('should handle removeLicense', () => {
    const initial = {
      ...initialState,
      licenses: [
        { id: 1, name: 'License 1' },
        { id: 2, name: 'License 2' },
      ],
    }
    const actual = reducer(initial, removeLicense(1))
    expect(actual.licenses).toHaveLength(1)
    expect(actual.licenses[0].id).toEqual(2)
  })

  it('should handle setLoading', () => {
    const actual = reducer(initialState, setLoading(true))
    expect(actual.loading).toEqual(true)
  })

  it('should handle setError', () => {
    const error = 'Test error'
    const actual = reducer(initialState, setError(error))
    expect(actual.error).toEqual(error)
  })
})
