import { useId, useState } from 'react'
import type { ComparisonSite } from '../../../types/intake'

type ComparisonSitesFieldProps = {
  sites: ComparisonSite[]
  onAdd: (url: string, notes: string) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

const maxSites = 3

function ComparisonSitesField({ sites, onAdd, onRemove }: ComparisonSitesFieldProps) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const legendId = useId()

  async function handleAdd() {
    if (!url.trim()) return
    try {
      await onAdd(url.trim(), notes.trim())
      setUrl('')
      setNotes('')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'That site could not be added.')
    }
  }

  return (
    <fieldset className="wizard-field comparison-sites">
      <legend id={legendId}>Are there comparison websites we should look at? (up to 3, optional)</legend>

      <ul className="comparison-sites__list">
        {sites.map((site) => (
          <li key={site.id}>
            <span>{site.url}</span>
            {site.likes_notes && <p>{site.likes_notes}</p>}
            <button type="button" onClick={() => onRemove(site.id)} aria-label={`Remove ${site.url}`}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {sites.length < maxSites && (
        <div className="comparison-sites__add">
          <label htmlFor="comparison-url">Website URL</label>
          <input id="comparison-url" type="url" placeholder="https://example.com" value={url} onChange={(event) => setUrl(event.currentTarget.value)} />
          <label htmlFor="comparison-notes">What do you like about this site? (layout, imagery, specific sections, etc.)</label>
          <textarea id="comparison-notes" rows={2} value={notes} onChange={(event) => setNotes(event.currentTarget.value)} />
          <button type="button" onClick={handleAdd}>Add site</button>
        </div>
      )}
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </fieldset>
  )
}

export default ComparisonSitesField
