export type AuthStatus = 'anonymous' | 'link-sent' | 'authenticated'

export type BasicInfo = {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  address: string
  businessType: string
}

export type ComparisonSite = {
  id: string
  url: string
  likes_notes: string | null
}

export type IntakeSubmission = {
  id: string
  current_step: number
  status: 'in_progress' | 'submitted'
  has_current_website: number | null
  current_website_url: string | null
  current_website_likes: string | null
  current_website_dislikes: string | null
  has_design_in_mind: number | null
  features_needed: string | null
  existing_domain: string | null
  has_no_domain: number
  preferred_tech_stack: string | null
  has_brand_guidelines: number | null
}

export type ClientFile = {
  id: string
  file_type: 'design_reference' | 'brand_guidelines'
  original_filename: string
  size_bytes: number
  uploaded_at: string
}

export type IntakeState = {
  client: { id: string, first_name: string, last_name: string, email: string }
  submission: IntakeSubmission
  comparisonSites: ComparisonSite[]
  files: ClientFile[]
}

export const wizardSteps = [
  'intro',
  'basicInfo',
  'currentWebsite',
  'designPreference',
  'designDetails',
  'review',
] as const

export type WizardStep = (typeof wizardSteps)[number]
