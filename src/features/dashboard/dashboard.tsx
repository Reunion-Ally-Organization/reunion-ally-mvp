import type { ReactElement } from 'react'
import './dashboard.css'
import { Navbar } from '../homepage/components/Navbar'
import type { AuthView } from '../homepage/components/AuthModal'
import type { PageType } from '../../types'

// ── Types ────────────────────────────────────────────
type AttendanceStatus = 'Paid' | 'Pending' | 'Declined'

interface Attendee {
  id: number
  name: string
  status: AttendanceStatus
}

interface ActivityType {
  type: 'paid' | 'rsvp' | 'reminder' | 'declined' | 'venue'
  description: string
  time: string
}

// ── Mock Data ────────────────────────────────────────
const EVENT = {
  name: 'Class of 1992 Reunion',
  date: 'July, 20th 2026',
  time: '11:00am – 5:00pm',
  location: 'Hilton Hotel Ballroom',
  cost: '$20 per person',
}

const BUDGET = {
  collected: 3700,
  remaining: 1450,
  goal: 5150,
}

const ATTENDEES: Attendee[] = [
  { id: 1, name: 'Kim Johnson',      status: 'Paid'     },
  { id: 2, name: 'Jeffery Brownlee', status: 'Pending'  },
  { id: 3, name: 'Jeffery Brownlee', status: 'Pending'  },
  { id: 4, name: 'Quinten Matthews', status: 'Declined' },
  { id: 5, name: 'Frank Smith',      status: 'Paid'     },
]

const ACTIVITY: ActivityType[] = [
  { type: 'paid',     description: 'Kim Johnson paid her dues',           time: '2 hours ago'  },
  { type: 'rsvp',     description: "Frank Smith RSVP'd as attending",     time: '5 hours ago'  },
  { type: 'reminder', description: 'Reminder sent to 14 pending attendees', time: 'Yesterday'  },
  { type: 'declined', description: 'Quinten Matthews declined the invitation', time: 'Yesterday' },
  { type: 'venue',    description: 'Venue confirmed: Hilton Hotel Ballroom', time: '2 days ago' },
]

const ATTENDANCE_TOTAL = 300
const ATTENDANCE_CONFIRMED = 102

// ── Sub-components ───────────────────────────────────

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M3 9l9-7 9 7"/>
      <path d="M3 15h6l-3 5-3-5z"/>
      <path d="M15 15h6l-3 5-3-5z"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function RsvpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

// ── Activity icon selector ───────────────────────────
function ActivityItemIcon({ type }: { type: ActivityType['type'] }) {
  const map: Record<ActivityType['type'], { cls: string; icon: ReactElement }> = {
    paid:     { cls: 'recent-activity__icon--paid',     icon: <CheckIcon />   },
    rsvp:     { cls: 'recent-activity__icon--rsvp',     icon: <RsvpIcon />    },
    reminder: { cls: 'recent-activity__icon--reminder', icon: <BellIcon />    },
    declined: { cls: 'recent-activity__icon--declined', icon: <XIcon />       },
    venue:    { cls: 'recent-activity__icon--venue',    icon: <MapPinIcon />  },
  }
  const { cls, icon } = map[type]
  return <span className={`recent-activity__icon ${cls}`}>{icon}</span>
}

// ── Status helper ────────────────────────────────────
function statusClass(status: AttendanceStatus) {
  return `attendance-item__status attendance-item__status--${status.toLowerCase()}`
}

// ── Cards ────────────────────────────────────────────

function EventDetailsCard() {
  return (
    <div className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">
          <PinIcon />
          Event Details
        </h2>
        <a href="#" className="dash-card__view-more">View More</a>
      </div>
      <dl className="event-details__grid">
        <dt className="event-details__label">Date:</dt>
        <dd className="event-details__value">{EVENT.date}</dd>

        <dt className="event-details__label">Time:</dt>
        <dd className="event-details__value">{EVENT.time}</dd>

        <dt className="event-details__label">Location:</dt>
        <dd className="event-details__value">{EVENT.location}</dd>

        <dt className="event-details__label">Cost:</dt>
        <dd className="event-details__value">{EVENT.cost}</dd>
      </dl>
    </div>
  )
}

function BudgetOverviewCard({ onViewMore }: { onViewMore: () => void }) {
  const pct = Math.round((BUDGET.collected / BUDGET.goal) * 100)
  return (
    <div className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">
          <ScaleIcon />
          Budget Overview
        </h2>
        <button className="dash-card__view-more" onClick={onViewMore}>View More</button>
      </div>
      <div className="budget-overview__row">
        <div className="budget-overview__item">
          <p className="budget-overview__item-label">Collected</p>
          <p className="budget-overview__item-value">${BUDGET.collected.toLocaleString()}</p>
        </div>
        <div className="budget-overview__item">
          <p className="budget-overview__item-label">Remaining</p>
          <p className="budget-overview__item-value">${BUDGET.remaining.toLocaleString()}</p>
        </div>
      </div>
      <div className="budget-overview__bar">
        <div className="budget-overview__bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function AttendanceCard({ onViewMore }: { onViewMore: () => void }) {
  return (
    <div className="dash-card attendance-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">
          <UsersIcon />
          Attendance ({ATTENDANCE_CONFIRMED}/{ATTENDANCE_TOTAL})
        </h2>
        <button className="dash-card__view-more" onClick={onViewMore}>View More</button>
      </div>
      <ul className="attendance-list">
        {ATTENDEES.map((a) => (
          <li key={a.id} className="attendance-item">
            <span className="attendance-item__avatar">
              <PersonIcon />
            </span>
            <div className="attendance-item__info">
              <p className="attendance-item__name">{a.name}</p>
              <p className={statusClass(a.status)}>{a.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RecentActivityCard({ onManageEvents }: { onManageEvents: () => void }) {
  return (
    <div className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">
          <ActivityIcon />
          Recent Activity
        </h2>
        <button className="dash-card__view-more" onClick={onManageEvents}>Manage events &rsaquo;</button>
      </div>
      <ul className="recent-activity__list">
        {ACTIVITY.map((item, idx) => (
          <li key={idx} className="recent-activity__item">
            <ActivityItemIcon type={item.type} />
            <div className="recent-activity__text">
              <p className="recent-activity__desc">{item.description}</p>
              <p className="recent-activity__time">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Dashboard Page ───────────────────────────────────
interface DashboardProps {
  onAuthOpen: (view: AuthView) => void
  onNavigate: (page: PageType) => void
}

export default function Dashboard({ onAuthOpen, onNavigate }: DashboardProps) {
  return (
    <div className="dashboard-page">
      <Navbar
        onAuthOpen={onAuthOpen}
        activeItem="Dashboard"
        onNavigate={(item) => {
          const map: Record<string, PageType> = {
            'Attendance Tracker': 'attendance-tracker',
            'Budget Tracker': 'budget-tracker',
            'Manage Event': 'manage-event',
            'Help': 'help',
          }
          if (map[item]) onNavigate(map[item])
        }}
      />
      <div className="dashboard-header">
        <h1>Welcome to your dashboard</h1>
        <p className="dashboard-header__subtitle">A complete reunion management dashboard</p>
        <p className="dashboard-header__event-name">{EVENT.name}</p>
      </div>

      <div className="dashboard-grid">
        {/* Left column: Event Details + Budget Overview */}
        <div className="dashboard-grid__left">
          <EventDetailsCard />
          <BudgetOverviewCard onViewMore={() => onNavigate('budget-tracker')} />
        </div>

        {/* Right column: Attendance */}
        <div className="dashboard-grid__right">
          <AttendanceCard onViewMore={() => onNavigate('attendance-tracker')} />
        </div>

        {/* Bottom full-width: Recent Activity */}
        <div className="dashboard-grid__bottom">
          <RecentActivityCard onManageEvents={() => onNavigate('manage-event')} />
        </div>
      </div>
    </div>
  )
}
