import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  FunnelIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function LicenseFilters({ filters, onFilterChange, sortOptions, statusOptions }) {
  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status })
  }

  const handleSortChange = (sortBy) => {
    onFilterChange({ ...filters, sortBy })
  }

  const getCurrentSortLabel = () => {
    return sortOptions.find((option) => option.value === filters.sortBy)?.label || 'Sort'
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <h2 className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={classNames(
                filters.status === option.value
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium'
              )}
            >
              {option.label}
              {filters.status === option.value && (
                <CheckIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {getCurrentSortLabel()}
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSortChange(option.value)}
                      className={classNames(
                        active
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-200',
                        filters.sortBy === option.value ? 'bg-gray-50 dark:bg-gray-600' : '',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      <span className="flex items-center">
                        {option.label}
                        {filters.sortBy === option.value && (
                          <CheckIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
