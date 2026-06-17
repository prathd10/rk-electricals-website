import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PageLoader } from './ui/LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading)  return <PageLoader />
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}
