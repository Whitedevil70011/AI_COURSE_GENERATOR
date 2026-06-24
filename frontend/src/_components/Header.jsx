import React from 'react'
import { Button } from '../components/ui/button'

function Header() {
  return (
    <div className="flex justify-between items-center p-4 px-8 shadow-md bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-purple-500/10">
      { /* Styled SVG Logo matching the AI course generator theme */ }
      <div className="flex items-center gap-2 select-none">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          CourseGenius
        </span>
      </div>
      
      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/15 hover:scale-[1.02] transition-all duration-300 border-0">
        Get Started
      </Button>
    </div>
  )
}

export default Header
