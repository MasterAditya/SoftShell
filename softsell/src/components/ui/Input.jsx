import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = forwardRef(({ error, className = '', ...props }, ref) => {
  const baseStyles =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
  const errorStyles = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
    : ''

  return (
    <div>
      <input ref={ref} className={twMerge(baseStyles, errorStyles, className)} {...props} />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
