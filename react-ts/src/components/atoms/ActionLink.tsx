import type { AnchorHTMLAttributes, ReactNode } from 'react'
import ArrowIcon from './ArrowIcon'

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'solid' | 'outline'
}

function ActionLink({ children, className = '', variant = 'solid', ...props }: ActionLinkProps) {
  return (
    <a className={`action-link action-link--${variant} ${className}`.trim()} {...props}>
      <span>{children}</span>
      <ArrowIcon className="action-link__arrow" />
    </a>
  )
}

export default ActionLink
