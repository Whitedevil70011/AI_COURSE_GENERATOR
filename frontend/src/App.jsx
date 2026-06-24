import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return isAuthenticated ? (
    <>
      <p>Welcome, {user.email}</p>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Logout
      </button>
    </>
  ) : (
    <>
      <button onClick={() => loginWithRedirect()}>Login</button>
      <button onClick={() => loginWithRedirect({
        authorizationParams: { screen_hint: 'signup' }
      })}>
        Signup
      </button>
    </>
  )
}

export default App