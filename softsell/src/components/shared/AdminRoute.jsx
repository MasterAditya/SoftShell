import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'

export default function AdminRoute({ children }) {
  const user = useSelector(selectUser)

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
