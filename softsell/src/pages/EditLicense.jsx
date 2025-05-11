import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { licenseService } from '../features/licenses/licenseService'
import { LicenseForm } from '../features/licenses/components/LicenseForm'

export default function EditLicense() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [license, setLicense] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit License</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update the license details below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <LicenseForm license={license} />
        </div>
      </div>
    </div>
  )
}
