const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Tech Outfitters home">
        Tech Outfitters<span>.</span>
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
        Now booking Fall 2026
      </a>
    </header>
  )
}

export default SiteHeader
