import { useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ResetPasswordForm } from '../features/auth/components/ResetPasswordForm'
import { Logo } from '../components/shared/Logo'

export default function ResetPassword() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  if (!token) {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Set new password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below.
        </p>
      </motion.div>

      <ResetPasswordForm token={token} />
    </div>
  )
}
