import './HomePage.css'
import { CallToAction } from './components/CallToAction'
import { DashboardPreview } from './components/DashboardPreview'
import { FeatureSection } from './components/FeatureSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Navbar } from './components/Navbar'

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
        <DashboardPreview />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
