import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  sold: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const statusIcons = {
  pending: ClockIcon,
  active: CheckCircleIcon,
  sold: CurrencyDollarIcon,
  rejected: XCircleIcon,
}

export function LicenseCard({ license }) {
  const StatusIcon = statusIcons[license.status] || ArrowPathIcon

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
              {license.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
              {license.software}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[license.status]
            }`}
          >
            <StatusIcon className="mr-1.5 h-4 w-4" />
            {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>
              <span className="font-medium text-gray-900 dark:text-white">${license.price}</span>
              {license.originalPrice && (
                <span className="ml-2 line-through">${license.originalPrice}</span>
              )}
            </p>
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>Valid until {new Date(license.expiryDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            to={`/dashboard/licenses/${license.id}`}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </Link>
          {license.status === 'active' && (
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit for Review
            </button>
          )}
          {license.status === 'pending' && (
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel Review
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
