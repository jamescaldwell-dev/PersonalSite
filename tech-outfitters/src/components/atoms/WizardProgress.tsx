type WizardProgressProps = {
  currentIndex: number
  totalSteps: number
  stepLabel: string
}

// aria-live region announces step changes for screen reader users navigating a single-page wizard.
function WizardProgress({ currentIndex, totalSteps, stepLabel }: WizardProgressProps) {
  const percent = Math.round(((currentIndex + 1) / totalSteps) * 100)

  return (
    <div className="wizard-progress">
      <div className="wizard-progress__track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="wizard-progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="wizard-progress__label" aria-live="polite">
        Step {currentIndex + 1} of {totalSteps}: {stepLabel}
      </p>
    </div>
  )
}

export default WizardProgress
