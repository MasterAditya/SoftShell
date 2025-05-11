import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { licenseService } from '../licenseService'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

const licenseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  software: z.string().min(2, 'Software name must be at least 2 characters'),
  licenseKey: z.string().min(1, 'License key is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  originalPrice: z.number().min(0, 'Original price must be greater than or equal to 0'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  description: z.string().optional(),
})

export function LicenseForm({ license, onSubmit }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showLicenseKey, setShowLicenseKey] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: license?.name || '',
      software: license?.software || '',
      licenseKey: license?.licenseKey || '',
      price: license?.price || '',
      originalPrice: license?.originalPrice || '',
      expiryDate: license?.expiryDate
        ? new Date(license.expiryDate).toISOString().split('T')[0]
        : '',
      description: license?.description || '',
    },
  })

  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true)
      const formattedData = {
        ...data,
        price: Number(data.price),
        originalPrice: Number(data.originalPrice),
      }

      if (license) {
        await licenseService.updateLicense(license.id, formattedData)
        toast.success('License updated successfully!')
      } else {
        await licenseService.createLicense(formattedData)
        toast.success('License created successfully!')
      }

      navigate('/dashboard/licenses')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save license')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg"
    >
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                License Name
              </label>
              <div className="mt-1">
                <Input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  error={errors.name?.message}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="software"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Software Name
              </label>
              <div className="mt-1">
                <Input
                  id="software"
                  type="text"
                  {...register('software', {
                    required: 'Software name is required',
                    minLength: {
                      value: 2,
                      message: 'Software name must be at least 2 characters',
                    },
                  })}
                  error={errors.software?.message}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="licenseKey"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                License Key
              </label>
              <div className="mt-1 relative">
                <Input
                  id="licenseKey"
                  type={showLicenseKey ? 'text' : 'password'}
                  {...register('licenseKey', {
                    required: 'License key is required',
                  })}
                  error={errors.licenseKey?.message}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowLicenseKey(!showLicenseKey)}
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {showLicenseKey ? 'Hide' : 'Show'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Expiry Date
              </label>
              <div className="mt-1">
                <Input
                  id="expiryDate"
                  type="date"
                  {...register('expiryDate', {
                    required: 'Expiry date is required',
                  })}
                  error={errors.expiryDate?.message}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Selling Price ($)
              </label>
              <div className="mt-1">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', {
                    required: 'Price is required',
                    min: {
                      value: 0,
                      message: 'Price must be greater than or equal to 0',
                    },
                  })}
                  error={errors.price?.message}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="originalPrice"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Original Price ($)
              </label>
              <div className="mt-1">
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('originalPrice', {
                    required: 'Original price is required',
                    min: {
                      value: 0,
                      message: 'Original price must be greater than or equal to 0',
                    },
                  })}
                  error={errors.originalPrice?.message}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={4}
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                {...register('description')}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard/licenses')}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              {license ? 'Update License' : 'Create License'}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
