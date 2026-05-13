import { Icon } from './Icon'

export function CallToAction() {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="cta-card">
        <div className="cta-card__copy">
          <h2 id="cta-title">Ready to plan your perfect reunion?</h2>
          <p>Join thousands of organizers who trust Reunion Ally for their events</p>
        </div>
        <div className="cta-card__actions">
          <a className="button button--primary" href="/">
            Get free quotes
            <Icon name="arrow" />
          </a>
          <a className="button button--neutral" href="/">
            Free SignUp
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
