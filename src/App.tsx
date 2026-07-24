import { useState, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import HomePage from './features/homepage/homepage'
import Dashboard from './features/dashboard/dashboard'
import ManageEvent from './features/manage-event/ManageEvent'
import BudgetTracker from './features/budget-tracker/BudgetTracker'
import AttendanceTracker from './features/attendance-tracker/AttendanceTracker'
import Help from './features/help/Help'
import type { PageType } from './types'

const NAV_PAGE_MAP: Record<string, PageType> = {
  'Dashboard':          'dashboard',
  'Attendance Tracker': 'attendance-tracker',
  'Budget Tracker':     'budget-tracker',
  'Manage Event':       'manage-event',
  'Help':               'help',
}

function AppRoutes() {
  const { user, loading } = useAuth()
  const [page, setPage] = useState<PageType | null>(null)  // null = homepage

  // Reset to homepage when user signs out
  useEffect(() => {
    if (!user) setPage(null)
  }, [user])

  if (loading) return null

  // Show homepage whenever page is null OR user is not logged in
  if (page === null || !user) {
    return (
      <HomePage
        onNavigate={(navItem) => {
          const p = NAV_PAGE_MAP[navItem]
          if (p && user) setPage(p)
        }}
      />
    )
  }

  const sharedProps = { onNavigate: setPage, onAuthOpen: () => {} }

  switch (page) {
    case 'manage-event':       return <ManageEvent       {...sharedProps} />
    case 'budget-tracker':     return <BudgetTracker     {...sharedProps} />
    case 'attendance-tracker': return <AttendanceTracker {...sharedProps} />
    case 'help':               return <Help              {...sharedProps} />
    default:                   return <Dashboard         {...sharedProps} />
  }
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
