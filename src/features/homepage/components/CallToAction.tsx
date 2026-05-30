import type { AuthView } from './AuthModal'
import { Icon } from './Icon'

interface CallToActionProps {
  onAuthOpen: (view: AuthView) => void
}

export function CallToAction({ onAuthOpen }: CallToActionProps) {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="cta-card">
        <div className="cta-card__copy">
          <h2 id="cta-title">Ready to plan your perfect reunion?</h2>
          <p>Join thousands of organizers who trust Reunion Ally for their events</p>
        </div>
        <div className="cta-card__actions">
          <button className="button button--primary" onClick={() => onAuthOpen('signup')}>
            Create your account
            <Icon name="arrow" />
          </button>
          <button className="button button--outline" onClick={() => onAuthOpen('signup')}>
            Join our newsletter
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  )
}
