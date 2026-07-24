import { useState } from 'react'
import './HomePage.css'
import { AuthModal, type AuthView } from './components/AuthModal'
import { CallToAction } from './components/CallToAction'
import { DashboardPreview } from './components/DashboardPreview'
import { FeatureSection } from './components/FeatureSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Navbar } from './components/Navbar'

interface HomePageProps {
  onNavigate?: (navItem: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [authView, setAuthView] = useState<AuthView | null>(null)

  function openAuth(view: AuthView) {
    setAuthView(view)
  }

  function closeAuth() {
    setAuthView(null)
  }

  return (
    <div className="home-page">
      <Navbar onAuthOpen={openAuth} onNavigate={onNavigate} />
      <main>
        <Hero onAuthOpen={openAuth} />
        <FeatureSection />
        <DashboardPreview />
        <HowItWorks />
        <CallToAction onAuthOpen={openAuth} />
      </main>
      <Footer />
      {authView && <AuthModal initialView={authView} onClose={closeAuth} />}
    </div>
  )
}
