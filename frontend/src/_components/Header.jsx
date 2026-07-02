import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { Bookmark, Wallet, Crown, HelpCircle, LogOut, ChevronDown } from 'lucide-react'

function Header() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0()
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isPremium = user && user['https://coursegenius.com/premium'] === true

  const displayName = (user && (user.name || user.nickname)) || ''
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?'

  function handleLogout() {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 md:px-8 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)] bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/70">
      <div className="flex items-center gap-2 select-none">
        <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span className="font-semibold text-xl tracking-tight bg-linear-to-r from-violet-700 to-cyan-700 bg-clip-text text-transparent">
          CourseGenius
        </span>
      </div>

      {!isLoading && !isAuthenticated && (
        <Button
          onClick={() => loginWithRedirect()}
          className="rounded-full bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg shadow-violet-500/15 hover:scale-[1.02] transition-all duration-300 border-0 px-5"
        >
          Get Started
        </Button>
      )}

      {isAuthenticated && user && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(function (o) { return !o })}
            className="flex items-center gap-2 rounded-full border border-slate-200 pl-1 pr-3 py-1 hover:bg-slate-50 transition-colors"
          >
            {user.picture && !imgError ? (
              <img
                src={user.picture}
                alt={displayName}
                onError={() => setImgError(true)}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                {initial}
              </div>
            )}
            <ChevronDown
              className={
                open
                  ? 'w-4 h-4 text-slate-500 transition-transform rotate-180'
                  : 'w-4 h-4 text-slate-500 transition-transform'
              }
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-900/10 overflow-hidden">
              <div className="relative bg-linear-to-br from-violet-600 to-cyan-600 px-5 py-4">
                {isPremium && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Crown className="w-3.5 h-3.5" />
                    PREMIUM
                  </span>
                )}
                {user.picture && !imgError ? (
                  <img
                    src={user.picture}
                    alt={displayName}
                    onError={() => setImgError(true)}
                    className="w-14 h-14 rounded-full border-2 border-white/70 object-cover mb-2"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full border-2 border-white/70 bg-white/15 flex items-center justify-center text-white text-xl font-semibold mb-2">
                    {initial}
                  </div>
                )}
                <p className="font-bold text-white leading-tight break-words">
                  {displayName}
                </p>
                <a
                  href="/profile"
                  className="text-sm text-white/80 underline underline-offset-2 hover:text-white"
                >
                  View Profile
                </a>
              </div>

              <div className="py-2">
                <a href="/notes" className="flex items-center gap-3 px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                  <Bookmark className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Notes & Bookmarks</span>
                </a>
                <a href="/referrals" className="flex items-center gap-3 px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                  <Wallet className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Referrals & Payments</span>
                </a>
                <a href="/premium" className="flex items-center gap-3 px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                  <Crown className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Manage Premium</span>
                </a>

                <div className="my-2 border-t border-slate-100" />

                <a href="/contact" className="flex items-center gap-3 px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                  <HelpCircle className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Contact Us</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header