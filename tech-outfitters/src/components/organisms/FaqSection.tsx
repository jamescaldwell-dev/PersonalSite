import FaqItem from '../molecules/FaqItem'
import { faqEntries } from '../../data/faq'

function FaqSection() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <p className="eyebrow">FAQ</p>
      <h2 id="faq-title">Questions we hear a lot.</h2>
      <div className="faq__list">
        {faqEntries.map((entry) => (
          <FaqItem key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  )
}

export default FaqSection
