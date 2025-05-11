import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="px-6 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                {user?.name || 'Not provided'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Type
              </label>
              <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Member Since
              </label>
              <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                {new Date(user?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
