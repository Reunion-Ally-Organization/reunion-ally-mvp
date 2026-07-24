import { useState } from 'react'
import '../../shared/page.css'
import './ManageEvent.css'
import { Navbar } from '../homepage/components/Navbar'
import { Footer } from '../homepage/components/Footer'
import type { AuthView } from '../homepage/components/AuthModal'
import type { PageType } from '../../types'

// ── Types ────────────────────────────────────────────
interface ReunionEvent {
  id: number
  title: string
  confirmed: number
  capacity: number
  venue: string
  description: string
  date: string
  time: string
}

// ── Mock data ────────────────────────────────────────
const INITIAL_EVENTS: ReunionEvent[] = [
  { id: 1, title: 'Welcome Reception',  confirmed: 38, capacity: 50, venue: 'Hilton Ballroom',       description: 'Welcome drinks and registration',    date: 'June 15, 2026', time: '6:30PM – 8:30PM' },
  { id: 2, title: 'Dinner Gala',        confirmed: 38, capacity: 50, venue: 'Hilton Ballroom',       description: 'Plated dinner and keynote toasts',   date: 'June 15, 2026', time: '6:30PM – 8:30PM' },
  { id: 3, title: 'Alumni Social',      confirmed: 38, capacity: 50, venue: 'Hilton Garden Terrace', description: 'Cocktails, music, and mingling',     date: 'June 15, 2026', time: '6:30PM – 8:30PM' },
  { id: 4, title: 'Closing Reception',  confirmed: 0,  capacity: 50, venue: 'Hilton Ballroom',       description: 'Farewell brunch and group photos',   date: 'June 15, 2026', time: '6:30PM – 8:30PM' },
]

// ── Icons ────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

// ── Component ────────────────────────────────────────
interface ManageEventProps {
  onNavigate: (page: PageType) => void
  onAuthOpen: (view: AuthView) => void
}

export default function ManageEvent({ onNavigate, onAuthOpen }: ManageEventProps) {
  const [events, setEvents] = useState<ReunionEvent[]>(INITIAL_EVENTS)

  const stats = {
    total: events.length,
    confirmed: events.filter((e) => e.confirmed > 0).length,
    pending: events.filter((e) => e.confirmed === 0).length,
    attendeesInvited: events.reduce((s, e) => s + e.capacity, 0),
  }

  function deleteEvent(id: number) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="inner-page">
      <Navbar
        onAuthOpen={onAuthOpen}
        activeItem="Manage Event"
        onNavigate={(item) => {
          const map: Record<string, PageType> = {
            'Dashboard': 'dashboard',
            'Attendance Tracker': 'attendance-tracker',
            'Budget Tracker': 'budget-tracker',
            'Manage Event': 'manage-event',
            'Help': 'help',
          }
          if (map[item]) onNavigate(map[item])
        }}
      />

      <div className="inner-page__header">
        <h1 className="inner-page__title">Class of 1992 Reunion</h1>
        <p className="inner-page__subtitle">Organize and manage all your reunion events in one place</p>
      </div>

      <div className="inner-page__body">
        {/* Add Event */}
        <button className="page-btn page-btn--primary page-btn--full">
          <PlusIcon /> Add Event
        </button>

        {/* Events Stats */}
        <div className="page-card">
          <h2 className="page-card__title" style={{ marginBottom: '16px' }}>Events Stats</h2>
          <div className="me-stats">
            {[
              { label: 'Total Events',       value: stats.total           },
              { label: 'Confirmed',          value: stats.confirmed       },
              { label: 'Pending',            value: stats.pending         },
              { label: 'Attendees Invited',  value: stats.attendeesInvited },
            ].map((row) => (
              <div key={row.label} className="me-stats__row">
                <span className="me-stats__label">{row.label}</span>
                <span className="me-stats__value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events Schedule */}
        <div className="page-card">
          <h2 className="page-card__title" style={{ marginBottom: '16px' }}>Events Schedule</h2>
          <div className="me-schedule">
            {events.map((ev) => (
              <div key={ev.id} className="me-event">
                <div className="me-event__top">
                  <div className="me-event__name-row">
                    <span className="me-event__name">{ev.title}</span>
                    <span className="me-event__badge">
                      {ev.confirmed}/{ev.capacity} confirmed attendees
                    </span>
                  </div>
                  <div className="me-event__actions">
                    <button className="page-btn page-btn--primary me-event__btn">
                      <PencilIcon /> Edit
                    </button>
                    <button
                      className="page-btn page-btn--outline me-event__btn"
                      onClick={() => deleteEvent(ev.id)}
                    >
                      <TrashIcon /> Delete
                    </button>
                  </div>
                </div>
                <p className="me-event__desc">{ev.venue} – {ev.description}</p>
                <p className="me-event__meta">
                  <span>{ev.date}</span>
                  <span>{ev.time}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
