import React from 'react'
import { Button } from '../components/ui/button'

function Header() {
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
      
      <Button className="rounded-full bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg shadow-violet-500/15 hover:scale-[1.02] transition-all duration-300 border-0 px-5">
        Get Started
      </Button>
    </div>
  )
}

export default Header
