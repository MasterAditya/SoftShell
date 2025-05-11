import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  setLicenses,
  setLoading,
  setError,
  setFilters,
  setPagination,
  selectLicenses,
  selectLicenseLoading,
  selectLicenseFilters,
  selectLicensePagination,
} from '../licenseSlice'
import { licenseService } from '../licenseService'
import { LicenseCard } from './LicenseCard'
import { LicenseFilters } from './LicenseFilters'
import { Button } from '../../../components/ui/Button'

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Active', value: 'active' },
  { label: 'Sold', value: 'sold' },
  { label: 'Rejected', value: 'rejected' },
]

export function LicenseList() {
  const dispatch = useDispatch()
  const licenses = useSelector(selectLicenses)
  const isLoading = useSelector(selectLicenseLoading)
  const filters = useSelector(selectLicenseFilters)
  const pagination = useSelector(selectLicensePagination)
  const [hasMore, setHasMore] = useState(true)

  const fetchLicenses = async (page = 1) => {
    try {
      dispatch(setLoading(true))
      const response = await licenseService.getLicenses({
        ...filters,
        page,
        limit: pagination.limit,
      })
      
      if (page === 1) {
        dispatch(setLicenses(response.data))
      } else {
        dispatch(setLicenses([...licenses, ...response.data]))
      }
      
      dispatch(setPagination({
        page,
        total: response.total,
      }))
      
      setHasMore(response.data.length === pagination.limit)
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to fetch licenses'))
      toast.error(error.response?.data?.message || 'Failed to fetch licenses')
    }
  }

  useEffect(() => {
    fetchLicenses()
  }, [filters])

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters))
    dispatch(setPagination({ page: 1 }))
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchLicenses(pagination.page + 1)
    }
  }

  return (
    <div className="space-y-6">
      <LicenseFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        sortOptions={sortOptions}
        statusOptions={statusOptions}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {licenses.map((license, index) => (
            <motion.div
              key={license.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LicenseCard license={license} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {licenses.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No licenses found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your filters or create a new license.
          </p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="secondary"
            onClick={loadMore}
            loading={isLoading}
            disabled={isLoading || !hasMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
