import React from 'react'
import { Button } from '../components/ui/button'
import heroImage from '../assets/hero.png'

function Hero() {
  return (
<section className="flex justify-center py-12 px-4">
  <div className="max-w-2xl text-center">
    <p className="text-violet-600 text-3xl font-bold mb-2">
      AI Course Generator
    </p>

    <h1 className="text-5xl font-extrabold text-black leading-tight mb-6">
      Custom Learning Paths,
      <br />
      Powered by AI
    </h1>

    <p className="max-w-lg mx-auto text-gray-700 text-xl leading-relaxed mb-8">
      Unlock personalized education with AI-driven course creation.
      Tailor your learning journey to fit your unique goals and pace.
    </p>

    <Button
      className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2 h-11 rounded-md"
    >
      Get Started
    </Button>
  </div>
</section>
  )
}

export default Hero