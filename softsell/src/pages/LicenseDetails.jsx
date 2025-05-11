import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { licenseService } from '../features/licenses/licenseService'
import { Button } from '../components/ui/Button'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  sold: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

export default function LicenseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [license, setLicense] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const data = await licenseService.getLicenseById(id)
        setLicense(data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch license')
        navigate('/dashboard/licenses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLicense()
  }, [id, navigate])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this license?')) {
      try {
        setIsDeleting(true)
        await licenseService.deleteLicense(id)
        toast.success('License deleted successfully')
        navigate('/dashboard/licenses')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete license')
        setIsDeleting(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard/licenses')}
              className="mr-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{license.name}</h1>
          </div>
          <div className="flex space-x-3">
            <Link to={`/dashboard/licenses/${id}/edit`}>
              <Button variant="secondary">
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {license.software}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    License ID: {license.id}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[license.status]
                  }`}
                >
                  {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</h4>
                  <div className="mt-2 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      ${license.price}
                    </span>
                    {license.originalPrice && (
                      <span className="ml-2 text-sm line-through text-gray-500">
                        ${license.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Expiry Date
                  </h4>
                  <div className="mt-2 flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {new Date(license.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {license.description && (
                  <div className="sm:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Description
                    </h4>
                    <p className="mt-2 text-gray-900 dark:text-white">{license.description}</p>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    License Key
                  </h4>
                  <div className="mt-2">
                    <div className="flex items-center space-x-3">
                      <code className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md font-mono text-sm break-all">
                        {license.licenseKey}
                      </code>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(license.licenseKey)
                          toast.success('License key copied to clipboard')
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {license.status === 'active' && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={async () => {
                        try {
                          await licenseService.submitForReview(license.id)
                          toast.success('License submitted for review')
                          navigate('/dashboard/licenses')
                        } catch (error) {
                          toast.error(
                            error.response?.data?.message || 'Failed to submit license for review'
                          )
                        }
                      }}
                    >
                      Submit for Review
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
