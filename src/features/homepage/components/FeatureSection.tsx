import {
  CommunicationCircleIcon,
  PaymentCircleIcon,
  SchedulingCircleIcon,
} from './CustomIcons'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    icon: <SchedulingCircleIcon size={72} />,
    title: 'Smart Scheduling',
    description:
      'Find the perfect date with polls, calendar integration, and automated reminders for everyone',
  },
  {
    icon: <PaymentCircleIcon size={72} />,
    title: 'Payment Management',
    description:
      'Collect dues, split costs, and handle refunds seamlessly with integrated payment processing.',
  },
  {
    icon: <CommunicationCircleIcon size={72} />,
    title: 'Unified Communication',
    description:
      'Join in on collective conversations in one platform, archived over years of past reunions.',
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
            <span className="custom-icon-wrap">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
