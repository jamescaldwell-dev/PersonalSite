import { useId, useState } from 'react'
import type { FaqEntry } from '../../data/faq'

type FaqItemProps = {
  entry: FaqEntry
}

function FaqItem({ entry }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <div className="faq-item">
      <h3>
        <button
          type="button"
          className="faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((open) => !open)}
        >
          {entry.question}
          <span className="faq-item__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={contentId} className="faq-item__panel" hidden={!isOpen}>
        <p>{entry.answer}</p>
      </div>
    </div>
  )
}

export default FaqItem
