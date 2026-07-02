import { SiteHeader } from './components/LANDPAGE/site-header'
import { Hero } from './components/LANDPAGE/hero'
import { VideoDemo } from './components/LANDPAGE/vide-demo'
import { Features } from './components/LANDPAGE/features'
import { HowItWorks } from './components/LANDPAGE/how-it-woek'
import { CtaFooter } from './components/LANDPAGE/cta-footer'

function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_48%)]" />
        <SiteHeader />
        <main id="top">
          <Hero />
          <VideoDemo />
          <Features />
          <HowItWorks />
          <CtaFooter />
        </main>
      </div>
    </div>
  )
}

export default App