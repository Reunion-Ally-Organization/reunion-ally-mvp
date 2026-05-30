import { BudgetSmallIcon, LocationSmallIcon, MultiAttendanceSmallIcon } from './CustomIcons'

interface DetailRow {
  label: string
  value: string
}

interface Attendee {
  name: string
  status: string
}

const eventDetails: DetailRow[] = [
  { label: 'Date:', value: 'July, 20th 2026' },
  { label: 'Time:', value: '11:00am - 5:00pm' },
  { label: 'Location:', value: 'Hilton Hotel Ballroom' },
  { label: 'Cost:', value: '$20 per person' },
]

const attendees: Attendee[] = [
  { name: 'Kim Johnson', status: 'Paid' },
  { name: 'Jeffery Brownlee', status: 'Pending' },
  { name: 'Jeffery Brownlee', status: 'Pending' },
  { name: 'Quinten Matthews', status: 'Declined' },
  { name: 'Frank Smith', status: 'Paid' },
]

export function DashboardPreview() {
  return (
    <section className="dashboard-section" aria-labelledby="dashboard-title">
      <div className="section__heading">
        <h2 id="dashboard-title">See it in action</h2>
        <p>A complete reunion management dashboard</p>
      </div>

      <div className="dashboard-preview">
        <h3>Class of 2002 Reunion</h3>
        <div className="dashboard-card">
          <div className="dashboard-card__column">
            <DashboardPanel title="Event Details" icon={<LocationSmallIcon />}>
              <dl className="detail-list">
                {eventDetails.map((detail) => (
                  <div className="detail-list__row" key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </DashboardPanel>

            <DashboardPanel title="Budget Overview" icon={<BudgetSmallIcon />}>
              <div className="budget-list">
                <div>
                  <strong>Collected</strong>
                  <span>$3,700</span>
                </div>
                <div>
                  <strong>Remaining</strong>
                  <span>$1,450</span>
                </div>
              </div>
            </DashboardPanel>
          </div>

          <DashboardPanel title="Attendance (102/300)" icon={<MultiAttendanceSmallIcon />} className="attendance-panel">
            <ul className="attendee-list">
              {attendees.map((attendee, index) => (
                <li key={`${attendee.name}-${attendee.status}-${index}`}>
                  <span className="attendee-avatar" aria-hidden>
                    {attendee.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{attendee.name}</strong>
                    <small>{attendee.status}</small>
                  </span>
                </li>
              ))}
            </ul>
          </DashboardPanel>
        </div>
      </div>
    </section>
  )
}

interface DashboardPanelProps {
  title: string
  icon: React.ReactNode
  className?: string
  children: React.ReactNode
}

function DashboardPanel({ title, icon, className = '', children }: DashboardPanelProps) {
  return (
    <section className={`dashboard-panel ${className}`.trim()}>
      <header className="dashboard-panel__header">
        <span>
          {icon}
          <strong>{title}</strong>
        </span>
        <a href="/">View More</a>
      </header>
      {children}
    </section>
  )
}
