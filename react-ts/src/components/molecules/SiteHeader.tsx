import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="James Caldwell home">
        JC<span>.</span>
      </NavLink>

      <nav aria-label="Primary navigation">
        <ul className="site-nav">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <NavLink to={item.href} className={({ isActive }) => isActive ? 'is-active' : undefined}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <NavLink className="availability" to="/contact">
        <span className="availability__dot" aria-hidden="true" />
        Available for select projects
      </NavLink>
    </header>
  )
}

export default SiteHeader
