const linkedInUrl = 'https://www.linkedin.com/in/james-caldwell-686042138/'

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>&copy; {year} James Caldwell</p>
      <p>Designed / Developed by James Caldwell</p>
      <a
        className="site-footer__social"
        href={linkedInUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="James Caldwell on LinkedIn"
        title="LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5.2 8.2H2.1V21h3.1V8.2ZM3.65 2A1.82 1.82 0 1 0 3.65 5.64 1.82 1.82 0 0 0 3.65 2ZM21.9 13.67c0-3.86-2.06-5.66-4.81-5.66-2.22 0-3.21 1.22-3.76 2.08V8.2h-3.1V21h3.1v-6.33c0-1.67.31-3.29 2.39-3.29 2.05 0 2.08 1.92 2.08 3.4V21h3.1v-7.33Z" />
        </svg>
      </a>
    </footer>
  )
}

export default SiteFooter
