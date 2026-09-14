import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'solid' | 'outline'
}

function ActionLink({ children, className = '', variant = 'solid', ...props }: ActionLinkProps) {
  return (
    <a className={`action-link action-link--${variant} ${className}`.trim()} {...props}>
      <span>{children}</span>
      <span className="action-link__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

export default ActionLink
