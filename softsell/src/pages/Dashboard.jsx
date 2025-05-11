import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  KeyIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Sales', icon: CurrencyDollarIcon, value: '$0', change: '+0%', changeType: 'positive' },
  { name: 'Active Licenses', icon: KeyIcon, value: '0', change: '0', changeType: 'neutral' },
  { name: 'Transactions', icon: ChartBarIcon, value: '0', change: '0', changeType: 'neutral' },
  {
    name: 'Messages',
    icon: ChatBubbleLeftRightIcon,
    value: '0',
    change: '0 unread',
    changeType: 'neutral',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* Stats */}
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow"
              >
                <dt>
                  <div className="absolute rounded-md p-3 bg-blue-500 bg-opacity-10">
                    <item.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  <p
                    className={classNames(
                      item.changeType === 'positive'
                        ? 'text-green-600'
                        : item.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-500',
                      'ml-2 flex items-baseline text-sm font-semibold'
                    )}
                  >
                    {item.change}
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>No recent activity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="/dashboard/sell"
                    className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <div className="flex-shrink-0">
                      <CurrencyDollarIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Sell a License</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List your unused software license
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="/dashboard/licenses"
                    className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <div className="flex-shrink-0">
                      <KeyIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">View Licenses</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your listed licenses
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
