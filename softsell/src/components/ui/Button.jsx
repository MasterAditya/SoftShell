import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none'
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    const variantStyles = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
      outline:
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400',
    }

    const classes = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth ? 'w-full' : '',
      disabled || loading ? 'cursor-not-allowed opacity-50' : '',
      className
    )

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
