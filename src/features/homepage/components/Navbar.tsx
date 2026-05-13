import logo from '../../../assets/home/reunion-ally-logo.png'

const navItems = ['Dashboard', 'Manage Event', 'Help'] as const

export function Navbar() {
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
        <a className="button button--outline button--small" href="/">
          SignUp
        </a>
        <a className="button button--primary button--small" href="/">
          LogIn
        </a>
      </div>
    </header>
  )
}
