import { Icon, type IconName } from './Icon'

interface Step {
  icon: IconName
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: 'location',
    title: 'Create your event',
    description: 'Set up your reunion details, invite list, and budget in minutes.',
  },
  {
    icon: 'plusUser',
    title: 'invite & Coordinate',
    description: 'Send invitations, poll for dates, and communicate with all attendees.',
  },
  {
    icon: 'settings',
    title: 'Manage & Execute',
    description: 'Collect payment, track RSVPs, and ensure everything runs smoothly',
  },
]

export function HowItWorks() {
  return (
    <section className="section section--white how-section" aria-labelledby="how-title">
      <div className="section__heading">
        <h2 id="how-title">How it works</h2>
        <p>Get your reunion organized in three simple steps</p>
      </div>
      <div className="feature-grid">
        {steps.map((step) => (
          <article className="feature-card" key={step.title}>
            <span className="icon-badge">
              <Icon name={step.icon} />
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
