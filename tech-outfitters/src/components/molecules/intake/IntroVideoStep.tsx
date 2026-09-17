type IntroVideoStepProps = {
  onContinue: () => void
}

// Placeholder facade until the actual intro video is recorded — swap the div for a lazy-loaded embed later.
function IntroVideoStep({ onContinue }: IntroVideoStepProps) {
  return (
    <section aria-labelledby="intro-step-heading">
      <h2 id="intro-step-heading">Meet James &amp; Erin</h2>
      <p>
        We&rsquo;re recording a short welcome video that walks through how we design and build your website together.
        In the meantime, here&rsquo;s the short version: we listen first, design second, and keep you in the loop the
        whole way through.
      </p>
      <div className="intro-video-step__placeholder" role="img" aria-label="Introduction video coming soon">
        Video coming soon
      </div>
      <div className="wizard-step__actions">
        <button type="button" className="wizard-step__primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </section>
  )
}

export default IntroVideoStep
