import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Hero } from './components/LANDPAGE/hero'

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
      <Hero />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
          <button
            className="rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/90"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
          <button
            className="rounded-full border border-border bg-transparent px-6 py-3 text-muted-foreground hover:bg-secondary"
            onClick={() => loginWithRedirect({
              authorizationParams: { screen_hint: 'signup' }
            })}
          >
            Signup
          </button>
        </div>
      </div>
    </>
  )
}

export default App