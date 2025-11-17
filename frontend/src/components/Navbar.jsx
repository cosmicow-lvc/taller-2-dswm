import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/bola-magica', label: 'Bola Mágica' },
    { to: '/pokemon', label: 'Pokémon' },
    { to: '/monster-high', label: 'Monster High' },
  ]

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" onClick={() => setOpen(false)}>InfoMóvil</Link>
      </div>

      <button
        className={`navbar__toggle ${open ? 'open' : ''}`}
        aria-label="Toggle navigation"
        onClick={() => setOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navbar__nav ${open ? 'open' : ''}`} aria-hidden={!open && undefined}>
        <ul>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={location.pathname === l.to ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar