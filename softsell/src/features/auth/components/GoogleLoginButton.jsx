import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authService } from '../authService'
import { setCredentials, setError } from '../authSlice'

export function GoogleLoginButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleLogin = async (response) => {
    try {
      const result = await authService.googleLogin(response.credential)
      dispatch(setCredentials(result))
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to login with Google'))
      toast.error(error.response?.data?.message || 'Failed to login with Google')
    }
  }

  return (
    <button
      type="button"
      onClick={() => {
        // Initialize Google Sign-In when button is clicked
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin,
          })
          window.google.accounts.id.prompt()
        } else {
          toast.error('Google Sign-In is not available')
        }
      }}
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
        />
      </svg>
      Sign in with Google
    </button>
  )
}
