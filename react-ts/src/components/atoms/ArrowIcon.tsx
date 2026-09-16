type ArrowIconProps = {
  className?: string
}

// Renders a diagonal arrow as an SVG so it stays consistent across platforms.
// A plain Unicode arrow glyph can fall back to a different emoji/icon font on
// some mobile browsers (notably Android Chrome).
function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ArrowIcon
