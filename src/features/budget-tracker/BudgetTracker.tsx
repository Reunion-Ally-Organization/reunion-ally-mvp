import '../../shared/page.css'
import './BudgetTracker.css'
import { Navbar } from '../homepage/components/Navbar'
import { Footer } from '../homepage/components/Footer'
import type { AuthView } from '../homepage/components/AuthModal'
import type { PageType } from '../../types'

// ── Mock data ────────────────────────────────────────
const BUDGET_STATS = { total: 1500, spent: 700, remaining: 800, attendees: 65 }

const TRANSACTIONS = [
  { id: 1, name: 'Venue Catering', date: 'September 11, 2026', amount: 150, category: 'Food & Beverage' },
  { id: 2, name: 'DJ Services',    date: 'August 28, 2026',    amount: 450, category: 'Entertainment'   },
  { id: 3, name: 'Photography',    date: 'August 15, 2026',    amount: 250, category: 'Services'        },
]

const PAYMENT_STATUS = { paid: 85, total: 95, collected: 1100, pending: 1225 }

const BREAKDOWN = [
  { label: 'Venue',         amount: 1500, color: '#4a5fab' },
  { label: 'Catering',      amount: 150,  color: '#9ca3af' },
  { label: 'Entertainment', amount: 325,  color: '#1e1e2e' },
  { label: 'Photography',   amount: 150,  color: '#4a5fab' },
  { label: 'Decorations',   amount: 275,  color: '#4a5fab' },
]

const DEADLINES = [
  { label: 'Final Headcount', note: 'Due in 3 Days', amount: 1500 },
  { label: 'Final Headcount', note: 'Due in 3 Days', amount: 375  },
  { label: 'Final Headcount', note: 'Due in 3 Days', amount: 150  },
]

// ── Icons ────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function DollarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a2.5 2.5 0 0 1 0 5H9"/>
    </svg>
  )
}
function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  )
}
function PiggyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 11c0-1.7-1.4-3-3-3H5a3 3 0 0 0-3 3v2a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-2z"/>
      <path d="M19 9.5V7a2 2 0 0 0-2-2h-1"/><circle cx="9" cy="13" r="1"/>
      <path d="M22 12h-3"/>
    </svg>
  )
}
function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

// ── Props ────────────────────────────────────────────
interface BudgetTrackerProps {
  onNavigate: (page: PageType) => void
  onAuthOpen: (view: AuthView) => void
}

export default function BudgetTracker({ onNavigate, onAuthOpen }: BudgetTrackerProps) {
  const paidPct = Math.round((PAYMENT_STATUS.paid / PAYMENT_STATUS.total) * 100)

  return (
    <div className="inner-page">
      <Navbar
        onAuthOpen={onAuthOpen}
        activeItem="Budget Tracker"
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
        <p className="inner-page__subtitle">Track and manage all your reunion expenses in one place</p>
      </div>

      <div className="inner-page__body">

        {/* Stat cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card__info">
              <p className="stat-card__label">Total Budget</p>
              <p className="stat-card__value">${BUDGET_STATS.total.toLocaleString()}</p>
            </div>
            <div className="stat-card__icon"><DollarIcon /></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__info">
              <p className="stat-card__label">Spent</p>
              <p className="stat-card__value">${BUDGET_STATS.spent.toLocaleString()}</p>
            </div>
            <div className="stat-card__icon"><CardIcon /></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__info">
              <p className="stat-card__label">Remaining</p>
              <p className="stat-card__value">${BUDGET_STATS.remaining.toLocaleString()}</p>
            </div>
            <div className="stat-card__icon"><PiggyIcon /></div>
          </div>
          <div className="stat-card">
            <div className="stat-card__info">
              <p className="stat-card__label">Attendees</p>
              <p className="stat-card__value">{BUDGET_STATS.attendees}</p>
            </div>
            <div className="stat-card__icon"><PeopleIcon /></div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="page-card">
          <div className="page-card__header">
            <h2 className="page-card__title">Recent Transactions</h2>
            <button className="page-btn page-btn--primary"><PlusIcon /> Add Expense</button>
          </div>
          <div className="bt-transactions">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="bt-transaction">
                <div>
                  <p className="bt-transaction__name">{t.name}</p>
                  <p className="bt-transaction__date">{t.date}</p>
                </div>
                <div className="bt-transaction__right">
                  <p className="bt-transaction__amount">${t.amount.toLocaleString()}</p>
                  <p className="bt-transaction__category">{t.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Collection Status */}
        <div className="page-card">
          <div className="page-card__header">
            <h2 className="page-card__title">Payment Collection Status</h2>
            <button className="page-btn page-btn--primary"><PlusIcon /> Add Payment</button>
          </div>
          <p className="bt-paid-label">Paid Attendees <strong>{PAYMENT_STATUS.paid}/{PAYMENT_STATUS.total}</strong></p>
          <div className="bt-progress">
            <div className="bt-progress__fill" style={{ width: `${paidPct}%` }} />
          </div>
          <div className="bt-collected-row">
            <span>${PAYMENT_STATUS.collected.toLocaleString()} Collected</span>
            <span>${PAYMENT_STATUS.pending.toLocaleString()} pending</span>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="page-card">
          <div className="page-card__header">
            <h2 className="page-card__title">Budget Breakdown</h2>
            <button className="page-btn page-btn--primary"><PlusIcon /> Add Item</button>
          </div>
          <div className="bt-breakdown">
            {BREAKDOWN.map((item) => (
              <div key={item.label} className="bt-breakdown__row">
                <span className="bt-breakdown__dot" style={{ background: item.color }} />
                <span className="bt-breakdown__label">{item.label}</span>
                <span className="bt-breakdown__amount">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '12px' }}>
            <button className="page-view-more">View More</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="page-card">
          <h2 className="page-card__title" style={{ marginBottom: '16px' }}>Quick Actions</h2>
          <div className="bt-quick-actions">
            <button className="page-btn page-btn--primary page-btn--full">Send Payment Reminder</button>
            <button className="page-btn page-btn--outline page-btn--full">Generate Report</button>
            <div className="bt-quick-actions__row">
              <button className="page-btn page-btn--outline page-btn--full">Export Data</button>
              <button className="page-btn page-btn--outline page-btn--full">Import Data</button>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="page-card">
          <h2 className="page-card__title" style={{ marginBottom: '16px' }}>Upcoming Deadlines</h2>
          <div className="bt-deadlines">
            {DEADLINES.map((d, i) => (
              <div key={i} className="bt-deadline">
                <span className="bt-deadline__dot" />
                <div className="bt-deadline__info">
                  <p className="bt-deadline__label">{d.label}</p>
                  <p className="bt-deadline__note">{d.note}</p>
                </div>
                <span className="bt-deadline__amount">${d.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
