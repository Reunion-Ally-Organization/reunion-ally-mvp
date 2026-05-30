import {
  BudgetCircleIcon,
  LocationCircleIcon,
  MultiAttendanceCircleIcon,
} from './CustomIcons'

interface Step {
  icon: React.ReactNode
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: <LocationCircleIcon size={60} />,
    title: 'Create your event',
    description: 'Set up your reunion details, invite list, and budget in minutes.',
  },
  {
    icon: <MultiAttendanceCircleIcon size={60} />,
    title: 'Invite & Coordinate',
    description: 'Send invitations, poll for dates, and communicate with all attendees.',
  },
  {
    icon: <BudgetCircleIcon size={60} />,
    title: 'Manage & Execute',
    description: 'Collect payment, track RSVPs, and ensure everything runs smoothly.',
  },
]

export function HowItWorks() {
  return (
    <section className="section section--white how-section" aria-labelledby="how-title">
      <div className="section__heading">
        <h2 id="how-title">How it works</h2>
        <p>Get your reunion organized in three simple steps</p>
      </div>
      <div className="how-steps">
        {steps.map((step) => (
          <article className="how-step" key={step.title}>
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
