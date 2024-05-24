// redux imports
import { useAppSelector } from '@store/hooks'
// react-router-dom
import { Navigate } from 'react-router-dom'

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // access auth state
  const { accessToken } = useAppSelector((state) => state.auth)

  // if user is not authenticated, redirect to login page
  if (!accessToken) {
    return <Navigate to='/login?message=login_required' />
  }
  return <>{children}</>
}

export default ProtectedRoute
