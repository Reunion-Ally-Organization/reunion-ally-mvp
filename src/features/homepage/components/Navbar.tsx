import logo from '../../../assets/home/reunion-ally-logo.png'
import type { AuthView } from './AuthModal'

const navItems = ['Dashboard', 'Manage Event', 'Help'] as const

interface NavbarProps {
  onAuthOpen: (view: AuthView) => void
}

export function Navbar({ onAuthOpen }: NavbarProps) {
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
      <div className="home-nav__actions">
        <button className="button button--outline button--small" onClick={() => onAuthOpen('signup')}>
          Sign Up
        </button>
        <button className="button button--primary button--small" onClick={() => onAuthOpen('login')}>
          Log In
        </button>
      </div>
    </header>
  )
}
