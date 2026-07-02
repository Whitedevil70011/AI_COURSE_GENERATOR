import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseGeniusLanding from './components/LANDPAGE/Coursegeniuslanding'

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently
  } = useAuth0()
  const navigate = useNavigate()

  // Silent token refresh — works on page reload
  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        try {
          const token = await getAccessTokenSilently()
          console.log('JWT ready:', token)   // remove in production
        } catch (err) {
          console.error('Token error:', err)
        }
      }
      fetchToken()
    }
  }, [isAuthenticated, getAccessTokenSilently])

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return isAuthenticated ? null : (
    <CourseGeniusLanding loginWithRedirect={loginWithRedirect} />
  )
}

export default App