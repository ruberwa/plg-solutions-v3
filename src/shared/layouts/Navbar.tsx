import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navbarContent } from '../book/shared-navbar-book'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div data-header="">
      <header className="site-header">
        <div className="container nav">
          <Link className="logo" to="/" aria-label={navbarContent.homeAria} onClick={() => setOpen(false)}>
            <img src={navbarContent.logoSrc} alt={navbarContent.logoAlt} />
          </Link>
          <button
            className="menu-btn"
            aria-label={navbarContent.menuLabel}
            aria-expanded={open}
            type="button"
            onClick={() => setOpen((value) => !value)}
          >
            <span></span>
          </button>
          <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Primary navigation">
            {navbarContent.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
              {navbarContent.cta}
            </Link>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar
