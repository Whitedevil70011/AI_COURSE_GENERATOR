import React, { useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Header() {
  const { user, isAuthenticated, logout } = useAuth0()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const displayName = user?.name || user?.nickname || user?.email || 'Guest'
  const firstName = displayName.split(' ')[0]
  const initial = firstName.charAt(0).toUpperCase()
  const isPremium = user?.['https://coursegenius.app/premium'] === true // custom claim, adjust to your Auth0 setup

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const menuItems = [
    {
      label: 'View profile',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      onClick: () => { window.location.href = '/profile' },
    },
    {
      label: 'My courses',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      onClick: () => { window.location.href = '/courses' },
    },
    {
      label: 'Billing',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => { window.location.href = '/billing' },
    },
    {
      label: 'Upgrade',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: () => { window.location.href = '/upgrade' },
    },
    {
      label: 'Contact us',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => { window.location.href = '/contact' },
    },
  ]

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

      {isAuthenticated && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 rounded-full pr-1 pl-1 py-1 sm:pr-3 bg-sky-200 hover:bg-sky-300 transition-colors"
          >
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              Hi, {firstName}
            </span>

            {user?.picture ? (
              <img
                src={user.picture}
                alt={firstName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-violet-600 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">
                {initial}
              </div>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-200/70 overflow-hidden z-50">
              <div className="bg-linear-to-tr from-violet-600 to-cyan-600 px-5 pt-5 pb-4">
                <div className="flex items-start justify-between">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={firstName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white/70"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/70 flex items-center justify-center text-white font-semibold">
                      {initial}
                    </div>
                  )}
                  {isPremium && (
                    <span className="flex items-center gap-1 bg-white/90 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 16L3 5l5.5 4L10 4l1.5 5L17 5l-2 11H5z" />
                      </svg>
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-3 text-white font-semibold text-sm truncate">{displayName}</p>
                <button
                  onClick={() => { setOpen(false); window.location.href = '/profile' }}
                  className="text-white/80 text-xs underline underline-offset-2 hover:text-white"
                >
                  View profile
                </button>
              </div>

              <div className="py-1">
                {menuItems.slice(1).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setOpen(false); item.onClick() }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-violet-600">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 py-1">
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
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