// redux imports
import { useAppSelector } from '@store/hooks'
// react-router-dom
import { Navigate, Outlet } from 'react-router-dom'

// ProtectedRoute component
const ProtectedRoute = () => {
  // access auth state
  const { accessToken } = useAppSelector((state) => state.auth)

  // if user is not authenticated, redirect to login page
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/login?message=login_required' />
  )
}

export default ProtectedRoute
