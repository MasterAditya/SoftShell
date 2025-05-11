import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { toggleTheme } from '../../store/themeSlice'
import { logout } from '../../features/auth/authSlice'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function DashboardHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { darkMode } = useSelector((state) => state.theme)
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      <div className="flex-1 px-4 flex justify-end">
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt={user?.name}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/dashboard/profile"
                      className={classNames(
                        active ? 'bg-gray-100 dark:bg-gray-600' : '',
                        'flex px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                      )}
                    >
                      <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        active ? 'bg-gray-100 dark:bg-gray-600' : '',
                        'flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                      )}
                    >
                      <ArrowRightOnRectangleIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
