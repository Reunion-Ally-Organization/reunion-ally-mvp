import { useEffect, useRef, useState } from 'react'
import logo from '../../../assets/home/reunion-ally-logo.png'
import { useAuth } from '../../../contexts/AuthContext'
import type { AuthView } from './AuthModal'

const navItems = [
  'Dashboard',
  'Attendance Tracker',
  'Budget Tracker',
  'Manage Event',
  'Help',
] as const

type NavItem = (typeof navItems)[number]

interface NavbarProps {
  onAuthOpen: (view: AuthView) => void
  activeItem?: NavItem
  onNavigate?: (item: NavItem) => void
}

export function Navbar({ onAuthOpen, activeItem = 'Dashboard', onNavigate }: NavbarProps) {
  const { user, signOut } = useAuth()
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  // Close account dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    if (accountMenuOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [accountMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? ''
  const initials = fullName
    ? fullName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : (user?.email?.[0] ?? '?').toUpperCase()

  return (
    <>
      <header className="home-nav">
        <a className="home-nav__brand" href="/" aria-label="Reunion Ally home">
          <img src={logo} alt="Reunion Ally" />
        </a>

        {/* Desktop nav links */}
        <nav className="home-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href="#"
              key={item}
              className={item === activeItem ? 'home-nav__link--active' : ''}
              onClick={(e) => { e.preventDefault(); onNavigate?.(item) }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop auth / user menu */}
        {user ? (
          <div className="user-menu home-nav__desktop-only" ref={accountMenuRef}>
            <button
              className="user-menu__trigger"
              onClick={() => setAccountMenuOpen((v) => !v)}
              aria-label="Account menu"
              aria-expanded={accountMenuOpen}
              aria-haspopup="true"
            >
              <span className="user-menu__avatar">{initials}</span>
            </button>

            {accountMenuOpen && (
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
                  onClick={() => { signOut(); setAccountMenuOpen(false) }}
                >
                  <SignOutIcon />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="home-nav__actions home-nav__desktop-only">
            <button className="button button--outline button--small" onClick={() => onAuthOpen('signup')}>
              Sign Up
            </button>
            <button className="button button--primary button--small" onClick={() => onAuthOpen('login')}>
              Log In
            </button>
          </div>
        )}

        {/* Hamburger button — mobile only */}
        <button
          className="ham-btn home-nav__mobile-only"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <HamburgerIcon />
        </button>
      </header>

      {/* Mobile slide-in menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`mobile-menu${mobileMenuOpen ? ' mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="mobile-menu__head">
          <span className="mobile-menu__title">Menu</span>
          <button
            className="mobile-menu__close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`mobile-menu__item${item === activeItem ? ' mobile-menu__item--active' : ''}`}
              onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate?.(item) }}
            >
              {item}
            </a>
          ))}
        </nav>

        {!user && (
          <>
            <hr className="mobile-menu__divider" />
            <div className="mobile-menu__auth">
              <button
                className="button button--outline button--small mobile-menu__auth-btn"
                onClick={() => { setMobileMenuOpen(false); onAuthOpen('signup') }}
              >
                Sign Up
              </button>
              <button
                className="button button--primary button--small mobile-menu__auth-btn"
                onClick={() => { setMobileMenuOpen(false); onAuthOpen('login') }}
              >
                Log In
              </button>
            </div>
          </>
        )}

        {user && (
          <>
            <hr className="mobile-menu__divider" />
            <div className="mobile-menu__auth">
              <button
                className="button button--outline button--small mobile-menu__auth-btn"
                onClick={() => { signOut(); setMobileMenuOpen(false) }}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
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

function HamburgerIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}

