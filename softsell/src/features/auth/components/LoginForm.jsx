import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { authService } from '../authService'
import { setCredentials, setError, setLoading } from '../authSlice'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { GoogleLoginButton } from './GoogleLoginButton'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'
  const { isLoading } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true))
      const result = await authService.login(data)
      dispatch(setCredentials(result))
      toast.success('Login successful!')
      navigate(from, { replace: true })
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to login'))
      toast.error(error.response?.data?.message || 'Failed to login')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email address
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="mt-1 relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" fullWidth loading={isLoading}>
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLoginButton />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Not a member?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Sign up now
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
