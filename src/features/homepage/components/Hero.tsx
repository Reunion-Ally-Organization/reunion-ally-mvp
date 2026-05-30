import heroImage from '../../../assets/home/hero.png'
import type { AuthView } from './AuthModal'

interface HeroProps {
  onAuthOpen: (view: AuthView) => void
}

export function Hero({ onAuthOpen }: HeroProps) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img className="hero-section__image" src={heroImage} alt="" />
      <div className="hero-section__content">
        <div className="hero-section__copy">
          <h1 id="hero-title">
            Reunion<br className="hero-break" /> Planning<br className="hero-break" /> Reimagined
          </h1>
          <p>Say goodbye to scattered planning and hello to stress-free reunions!</p>
          <button className="button button--primary button--large" onClick={() => onAuthOpen('signup')}>
            Start Planning
          </button>
        </div>
      </div>
    </section>
  )
}
