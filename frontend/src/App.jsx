import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BookOpen, LogOut, Sparkles, LayoutDashboard } from 'lucide-react'
import Hero from './_components/Hero'
import { Button } from './components/ui/button'

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        try {
          const token = await getAccessTokenSilently()
          console.log('JWT ready:', token)
        } catch (err) {
          console.error('Token error:', err)
        }
      }

      fetchToken()
    }
  }, [isAuthenticated, getAccessTokenSilently])

  if (isLoading) return <p className="p-6 text-center text-slate-500">Loading...</p>
  if (error) return <p className="p-6 text-center text-red-600">Error: {error.message}</p>

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-500/20">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-tight">CourseGenius</p>
              <p className="text-xs text-slate-500">AI-powered course generator</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => window.location.assign('/dashboard')}
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                >
                  <LayoutDashboard className="mr-2 size-4" />
                  Dashboard
                </Button>
                <Button onClick={handleLogout} className="bg-slate-950 text-white hover:bg-slate-800">
                  <LogOut className="mr-2 size-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => loginWithRedirect()}
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                >
                  Login
                </Button>
                <Button
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: { screen_hint: 'signup' },
                    })
                  }
                  className="bg-violet-600 text-white hover:bg-violet-700"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <Hero />

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Create structured courses',
                text: 'Turn a topic into modules, lessons, and assessments without starting from scratch.',
                icon: BookOpen,
              },
              {
                title: 'Keep learners on track',
                text: 'Use generated study paths, checklists, and milestones to make progress easier to follow.',
                icon: Sparkles,
              },
              {
                title: 'Return to your dashboard',
                text: 'Signed-in users can jump straight back into their saved courses and continue building.',
                icon: LayoutDashboard,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)]"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <item.icon className="size-5" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App