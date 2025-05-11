import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import {
  UsersIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { adminService } from '../features/admin/adminService'
import {
  setDashboardStats,
  setLicenseStats,
  setUserStats,
  setRevenueStats,
  setLoading,
  setError,
  selectDashboardStats,
  selectLicenseStats,
  selectUserStats,
  selectRevenueStats,
  selectLoading,
} from '../features/admin/adminSlice'
import { LineChart } from '../components/charts/LineChart'

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
  >
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </motion.div>
)

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const dashboardStats = useSelector(selectDashboardStats)
  const licenseStats = useSelector(selectLicenseStats)
  const userStats = useSelector(selectUserStats)
  const revenueStats = useSelector(selectRevenueStats)
  const isLoading = useSelector(selectLoading)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        dispatch(setLoading(true))
        const [dashboard, licenses, users, revenue] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getLicenseStats(),
          adminService.getUserStats(),
          adminService.getRevenueStats(),
        ])
        dispatch(setDashboardStats(dashboard))
        dispatch(setLicenseStats(licenses))
        dispatch(setUserStats(users))
        dispatch(setRevenueStats(revenue))
      } catch (error) {
        dispatch(setError(error.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchStats()
  }, [dispatch])

  if (isLoading || !dashboardStats) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            icon={UsersIcon}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Licenses"
            value={dashboardStats.activeLicenses}
            icon={DocumentCheckIcon}
            color="bg-green-500"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${dashboardStats.monthlyRevenue.toLocaleString()}`}
            icon={CurrencyDollarIcon}
            color="bg-yellow-500"
          />
          <StatCard
            title="Conversion Rate"
            value={`${dashboardStats.conversionRate}%`}
            icon={ChartBarIcon}
            color="bg-purple-500"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Trend</h2>
            <LineChart
              data={revenueStats.trend}
              xKey="date"
              yKey="amount"
              color="#10B981"
              height={300}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Growth</h2>
            <LineChart
              data={userStats.growth}
              xKey="date"
              yKey="count"
              color="#3B82F6"
              height={300}
            />
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {dashboardStats.recentActivity.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== dashboardStats.recentActivity.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                              activity.type === 'license'
                                ? 'bg-blue-500'
                                : activity.type === 'user'
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                            }`}
                          >
                            {activity.type === 'license' ? (
                              <DocumentCheckIcon className="h-5 w-5 text-white" />
                            ) : activity.type === 'user' ? (
                              <UsersIcon className="h-5 w-5 text-white" />
                            ) : (
                              <CurrencyDollarIcon className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
