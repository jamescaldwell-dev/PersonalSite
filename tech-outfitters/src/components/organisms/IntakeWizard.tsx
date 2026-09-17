import { useEffect, useState } from 'react'
import WizardProgress from '../atoms/WizardProgress'
import IntroVideoStep from '../molecules/intake/IntroVideoStep'
import BasicInfoStep from '../molecules/intake/BasicInfoStep'
import CurrentWebsiteStep, { type CurrentWebsiteValue } from '../molecules/intake/CurrentWebsiteStep'
import DesignPreferenceStep from '../molecules/intake/DesignPreferenceStep'
import DesignDetailsStep, { type DesignDetailsValue } from '../molecules/intake/DesignDetailsStep'
import ReviewSubmitStep from '../molecules/intake/ReviewSubmitStep'
import StatusMessage from '../atoms/StatusMessage'
import {
  addComparisonSite,
  createShareLink,
  getIntakeState,
  removeComparisonSite,
  revokeShareLink,
  saveStep,
  startIntake,
  submitIntake,
  uploadIntakeFile,
} from '../../api/intake'
import { wizardSteps, type BasicInfo, type IntakeState, type WizardStep } from '../../types/intake'

const stepLabels: Record<WizardStep, string> = {
  intro: 'Welcome',
  basicInfo: 'Basic information',
  currentWebsite: 'Current website',
  designPreference: 'Design preference',
  designDetails: 'Project details',
  review: 'Review & submit',
}

function IntakeWizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [state, setState] = useState<IntakeState | null>(null)
  const [loadError, setLoadError] = useState('')
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    getIntakeState()
      .then((loaded) => {
        if (!loaded) return
        setState(loaded)
        setStepIndex(Math.min(Math.max(loaded.submission.current_step, 1), wizardSteps.length - 1))
      })
      .catch(() => setLoadError('We could not load your saved progress. You can still continue below.'))
  }, [])

  function updateSubmission(patch: Partial<IntakeState['submission']>) {
    setState((current) => (current ? { ...current, submission: { ...current.submission, ...patch } } : current))
  }

  async function handleBasicInfoSubmit(info: BasicInfo & { captchaToken: string }) {
    const loaded = await startIntake(info)
    setState(loaded)
    setStepIndex(2)
  }

  async function handleCurrentWebsiteContinue(value: CurrentWebsiteValue) {
    await saveStep('currentWebsite', {
      hasCurrentWebsite: value.hasCurrentWebsite,
      currentWebsiteUrl: value.currentWebsiteUrl,
      currentWebsiteLikes: value.currentWebsiteLikes,
      currentWebsiteDislikes: value.currentWebsiteDislikes,
    }, 3)
    updateSubmission({
      has_current_website: value.hasCurrentWebsite === null ? null : Number(value.hasCurrentWebsite),
      current_website_url: value.currentWebsiteUrl || null,
      current_website_likes: value.currentWebsiteLikes || null,
      current_website_dislikes: value.currentWebsiteDislikes || null,
      current_step: 3,
    })
    setStepIndex(3)
  }

  async function handleDesignPreferenceContinue(hasDesignInMind: boolean | null) {
    await saveStep('designPreference', { hasDesignInMind }, 4)
    updateSubmission({
      has_design_in_mind: hasDesignInMind === null ? null : Number(hasDesignInMind),
      current_step: 4,
    })
    setStepIndex(4)
  }

  async function handleDesignDetailsContinue(value: DesignDetailsValue) {
    await saveStep('designDetails', value, 5)
    updateSubmission({
      features_needed: value.featuresNeeded || null,
      existing_domain: value.existingDomain || null,
      has_no_domain: Number(value.hasNoDomain),
      preferred_tech_stack: value.preferredTechStack || null,
      has_brand_guidelines: value.hasBrandGuidelines === null ? null : Number(value.hasBrandGuidelines),
      current_step: 5,
    })
    setStepIndex(5)
  }

  async function handleShare() {
    const result = await createShareLink()
    setShareUrl(result.shareUrl)
  }

  async function handleStopSharing() {
    await revokeShareLink()
    setShareUrl('')
  }

  const currentStep = wizardSteps[stepIndex]

  return (
    <div className="intake-wizard">
      <WizardProgress currentIndex={stepIndex} totalSteps={wizardSteps.length} stepLabel={stepLabels[currentStep]} />
      {loadError && <StatusMessage tone="error">{loadError}</StatusMessage>}

      <div className="intake-wizard__step" key={currentStep}>
        {currentStep === 'intro' && <IntroVideoStep onContinue={() => setStepIndex(1)} />}

        {currentStep === 'basicInfo' && (
          <BasicInfoStep onSubmit={handleBasicInfoSubmit} />
        )}

        {currentStep === 'currentWebsite' && state && (
          <CurrentWebsiteStep
            initialValue={{
              hasCurrentWebsite: state.submission.has_current_website === null ? null : Boolean(state.submission.has_current_website),
              currentWebsiteUrl: state.submission.current_website_url ?? '',
              currentWebsiteLikes: state.submission.current_website_likes ?? '',
              currentWebsiteDislikes: state.submission.current_website_dislikes ?? '',
            }}
            onContinue={handleCurrentWebsiteContinue}
            onBack={() => setStepIndex(1)}
          />
        )}

        {currentStep === 'designPreference' && state && (
          <DesignPreferenceStep
            initialValue={state.submission.has_design_in_mind === null ? null : Boolean(state.submission.has_design_in_mind)}
            onContinue={handleDesignPreferenceContinue}
            onBack={() => setStepIndex(2)}
          />
        )}

        {currentStep === 'designDetails' && state && (
          <DesignDetailsStep
            hasDesignInMind={state.submission.has_design_in_mind === null ? null : Boolean(state.submission.has_design_in_mind)}
            comparisonSites={state.comparisonSites}
            initialValue={{
              featuresNeeded: state.submission.features_needed ?? '',
              existingDomain: state.submission.existing_domain ?? '',
              hasNoDomain: Boolean(state.submission.has_no_domain),
              preferredTechStack: state.submission.preferred_tech_stack ?? '',
              hasBrandGuidelines: state.submission.has_brand_guidelines === null ? null : Boolean(state.submission.has_brand_guidelines),
            }}
            onAddComparisonSite={async (url: string, notes: string) => {
              const result = await addComparisonSite(url, notes)
              setState((current) => (current
                ? { ...current, comparisonSites: [...current.comparisonSites, { id: result.id, url, likes_notes: notes || null }] }
                : current))
            }}
            onRemoveComparisonSite={async (id: string) => {
              await removeComparisonSite(id)
              setState((current) => (current
                ? { ...current, comparisonSites: current.comparisonSites.filter((site) => site.id !== id) }
                : current))
            }}
            onUploadDesignFile={async (file: File) => {
              const uploaded = await uploadIntakeFile(file, 'design_reference')
              setState((current) => (current ? { ...current, files: [...current.files, uploaded] } : current))
            }}
            onUploadBrandFile={async (file: File) => {
              const uploaded = await uploadIntakeFile(file, 'brand_guidelines')
              setState((current) => (current ? { ...current, files: [...current.files, uploaded] } : current))
            }}
            onContinue={handleDesignDetailsContinue}
            onBack={() => setStepIndex(3)}
          />
        )}

        {currentStep === 'review' && state && (
          <ReviewSubmitStep state={state} onSubmit={submitIntake} onBack={() => setStepIndex(4)} />
        )}
      </div>

      {state && (
        <div className="intake-wizard__share">
          <p>Need help partway through? Share your progress with our team.</p>
          {shareUrl
            ? (
                <>
                  <p><strong>Share this link with our team:</strong> {shareUrl} (valid 24 hours)</p>
                  <button type="button" onClick={handleStopSharing}>Stop sharing</button>
                </>
              )
            : <button type="button" onClick={handleShare}>Share with our team</button>}
        </div>
      )}
    </div>
  )
}

export default IntakeWizard
