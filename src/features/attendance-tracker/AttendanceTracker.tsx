import { useState } from 'react'
import '../../shared/page.css'
import './AttendanceTracker.css'
import { Navbar } from '../homepage/components/Navbar'
import { Footer } from '../homepage/components/Footer'
import type { AuthView } from '../homepage/components/AuthModal'
import type { PageType } from '../../types'

// ── Types ────────────────────────────────────────────
type AttStatus = 'Attending' | 'Pending' | 'Declined'

interface AttendeeRow {
  id: number
  name: string
  email: string
  phone: string
  preferred: string
  status: AttStatus
  plusOne: boolean
}

// ── Mock data ────────────────────────────────────────
const INITIAL_ATTENDEES: AttendeeRow[] = [
  { id: 1, name: 'Matt Brown',    email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Attending', plusOne: true  },
  { id: 2, name: 'Sara Lee',      email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Pending',   plusOne: true  },
  { id: 3, name: 'Brook Cooper',  email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Attending', plusOne: true  },
  { id: 4, name: 'Lisa Newman',   email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Attending', plusOne: true  },
  { id: 5, name: 'Dan Steerling', email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Declined',  plusOne: true  },
  { id: 6, name: 'Alicia Locke',  email: 'matt.brown@gmail.com', phone: '+1 (917) 123-4567', preferred: '+1 (917) 123-4567', status: 'Attending', plusOne: true  },
]

// ── Icons ────────────────────────────────────────────
function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

// ── Status badge ─────────────────────────────────────
function StatusBadge({ status }: { status: AttStatus }) {
  const cls = `att-badge att-badge--${status.toLowerCase()}`
  return <span className={cls}>{status}</span>
}

// ── Props ────────────────────────────────────────────
interface AttendanceTrackerProps {
  onNavigate: (page: PageType) => void
  onAuthOpen: (view: AuthView) => void
}

export default function AttendanceTracker({ onNavigate, onAuthOpen }: AttendanceTrackerProps) {
  const [attendees, setAttendees] = useState<AttendeeRow[]>(INITIAL_ATTENDEES)
  const [tab, setTab] = useState<'attendees' | 'messages'>('attendees')

  const stats = {
    attending:   attendees.filter((a) => a.status === 'Attending').length,
    pending:     attendees.filter((a) => a.status === 'Pending').length,
    declined:    attendees.filter((a) => a.status === 'Declined').length,
    totalGuests: attendees.reduce((n, a) => n + (a.plusOne ? 2 : 1), 0) + 270,
  }

  function deleteAttendee(id: number) {
    setAttendees((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="inner-page">
      <Navbar
        onAuthOpen={onAuthOpen}
        activeItem="Attendance Tracker"
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
        <p className="inner-page__subtitle">Track attendance and send updates to your attendees</p>
      </div>

      <div className="inner-page__body">

        {/* Stat cards */}
        <div className="stat-grid">
          {[
            { label: 'Attending',    value: stats.attending   },
            { label: 'Pending',      value: stats.pending     },
            { label: 'Declined',     value: stats.declined    },
            { label: 'Total Guests', value: stats.totalGuests },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__info">
                <p className="stat-card__label">{s.label}</p>
                <p className="stat-card__value">{s.value}</p>
              </div>
              <div className="stat-card__icon"><PersonIcon /></div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="att-tabs">
          <button
            className={`att-tab${tab === 'attendees' ? ' att-tab--active' : ''}`}
            onClick={() => setTab('attendees')}
          >
            <PersonIcon /> Attendees
          </button>
          <button
            className={`att-tab${tab === 'messages' ? ' att-tab--active' : ''}`}
            onClick={() => setTab('messages')}
          >
            <MailIcon /> Messages
          </button>
        </div>

        {/* Attendee list */}
        {tab === 'attendees' && (
          <div className="page-card att-list-card">
            <div className="page-card__header">
              <h2 className="page-card__title">Attendee List</h2>
              <button className="page-btn page-btn--primary"><PlusIcon /> Add Attendee</button>
            </div>

            {/* Desktop table */}
            <div className="att-table-wrap">
              <table className="att-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Preferred</th>
                    <th>Status</th>
                    <th>Plus One</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((a) => (
                    <tr key={a.id}>
                      <td className="att-table__name">{a.name}</td>
                      <td className="att-table__contact">
                        <span>{a.email}</span>
                        <span>{a.phone}</span>
                      </td>
                      <td>{a.preferred}</td>
                      <td><StatusBadge status={a.status} /></td>
                      <td>{a.plusOne ? 'Yes' : 'No'}</td>
                      <td>
                        <div className="att-table__actions">
                          <button className="att-icon-btn" aria-label="Edit"><PencilIcon /></button>
                          <button className="att-icon-btn att-icon-btn--danger" aria-label="Delete" onClick={() => deleteAttendee(a.id)}><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="att-mobile-list">
              {attendees.map((a) => (
                <div key={a.id} className="att-mobile-card">
                  <div className="att-mobile-card__top">
                    <span className="att-mobile-card__name">{a.name}</span>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="att-mobile-card__contact">{a.email} · {a.phone}</p>
                  <div className="att-mobile-card__footer">
                    <span>Plus One: {a.plusOne ? 'Yes' : 'No'}</span>
                    <div className="att-table__actions">
                      <button className="att-icon-btn" aria-label="Edit"><PencilIcon /></button>
                      <button className="att-icon-btn att-icon-btn--danger" aria-label="Delete" onClick={() => deleteAttendee(a.id)}><TrashIcon /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages placeholder */}
        {tab === 'messages' && (
          <div className="page-card att-empty">
            <MailIcon />
            <p>No messages yet.</p>
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}
