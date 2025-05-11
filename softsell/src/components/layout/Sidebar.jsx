import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  CurrencyDollarIcon,
  KeyIcon,
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { Logo } from '../shared/Logo'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Sell License', href: '/dashboard/sell', icon: CurrencyDollarIcon },
  { name: 'My Licenses', href: '/dashboard/licenses', icon: KeyIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ChartBarIcon },
  { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export function Sidebar() {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={`flex flex-col flex-grow border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 bg-white dark:bg-gray-800 overflow-y-auto ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center flex-shrink-0 px-4">
        {isCollapsed ? (
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        ) : (
          <Logo />
        )}
      </div>
      <div className="mt-8 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
        <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                alt={user?.name}
              />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 transform transition-transform duration-200"
      >
        <svg
          className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  )
}
