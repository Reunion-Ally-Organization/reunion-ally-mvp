import { useEffect, useRef, useState } from 'react'
import logo from '../../../assets/home/reunion-ally-logo.png'
import { useAuth } from '../../../contexts/AuthContext'
import type { AuthView } from './AuthModal'

const navItems = ['Dashboard', 'Manage Event', 'Help'] as const

interface NavbarProps {
  onAuthOpen: (view: AuthView) => void
}

export function Navbar({ onAuthOpen }: NavbarProps) {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [menuOpen])

  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? ''
  const initials = fullName
    ? fullName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : (user?.email?.[0] ?? '?').toUpperCase()

  return (
    <header className="home-nav">
      <a className="home-nav__brand" href="/" aria-label="Reunion Ally home">
        <img src={logo} alt="Reunion Ally" />
      </a>
      <nav className="home-nav__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href="/" key={item}>
            {item}
          </a>
        ))}
      </nav>

      {user ? (
        <div className="user-menu" ref={menuRef}>
          <button
            className="user-menu__trigger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Account menu"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span className="user-menu__avatar">{initials}</span>
          </button>

          {menuOpen && (
            <div className="user-menu__dropdown" role="menu">
              <div className="user-menu__header">
                <span className="user-menu__avatar user-menu__avatar--lg">{initials}</span>
                <div className="user-menu__header-text">
                  <p className="user-menu__name">{fullName || 'Account'}</p>
                  <p className="user-menu__email">{user.email}</p>
                </div>
              </div>

              <hr className="user-menu__divider" />

              <button className="user-menu__item" role="menuitem">
                <UserIcon />
                Edit Profile
              </button>
              <button className="user-menu__item" role="menuitem">
                <PhotoIcon />
                Change Photo
              </button>

              <hr className="user-menu__divider" />

              <button
                className="user-menu__item user-menu__item--danger"
                role="menuitem"
                onClick={() => { signOut(); setMenuOpen(false) }}
              >
                <SignOutIcon />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="home-nav__actions">
          <button className="button button--outline button--small" onClick={() => onAuthOpen('signup')}>
            Sign Up
          </button>
          <button className="button button--primary button--small" onClick={() => onAuthOpen('login')}>
            Log In
          </button>
        </div>
      )}
    </header>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PhotoIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

