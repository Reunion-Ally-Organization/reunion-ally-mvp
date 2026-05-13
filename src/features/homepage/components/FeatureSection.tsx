import { Icon, type IconName } from './Icon'

interface FeatureCard {
  icon: IconName
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    icon: 'calendar',
    title: 'Smart Scheduling',
    description:
      'Find the perfect date with polls, calendar integration, and automated reminders for everyone',
  },
  {
    icon: 'payment',
    title: 'Payment Management',
    description:
      'Collect dues, split costs, and handle refunds seamlessly with integrated payment processing.',
  },
  {
    icon: 'message',
    title: 'Unified Communication',
    description:
      'Find the perfect date with polls, calendar integration, and automated reminders for everyone.',
  },
]

export function FeatureSection() {
  return (
    <section className="section section--white" aria-labelledby="features-title">
      <div className="section__heading">
        <h2 id="features-title">Everything you need</h2>
        <p>Streamline your reunion planning with our comprehensive tools</p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="icon-badge">
              <Icon name={feature.icon} />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
