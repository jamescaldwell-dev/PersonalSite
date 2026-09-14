const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label="James Caldwell home">
        JC<span>.</span>
      </a>

      <nav aria-label="Primary navigation">
        <ul className="site-nav">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="availability" href="#contact">
        <span className="availability__dot" aria-hidden="true" />
        Available for select work
      </a>
    </header>
  )
}

export default SiteHeader
