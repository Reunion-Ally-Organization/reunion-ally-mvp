import logo from '../../../assets/home/reunion-ally-logo.png'

const links = ['Terms', 'Privacy', 'Cookies'] as const

export function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <img src={logo} alt="Reunion Ally" />
        <nav aria-label="Footer navigation">
          {links.map((link) => (
            <a href="/" key={link}>
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
