import { useId, useState, type ChangeEvent } from 'react'

const maxSizeBytes = 50 * 1024 * 1024

type FileUploadInputProps = {
  label: string
  helpText?: string
  onFileSelected: (file: File) => Promise<void>
}

function FileUploadInput({ label, helpText, onFileSelected }: FileUploadInputProps) {
  const inputId = useId()
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fileName, setFileName] = useState('')

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    if (!file.name.toLowerCase().endsWith('.zip')) {
      setStatus('error')
      setErrorMessage('Please choose a .zip file.')
      return
    }
    if (file.size > maxSizeBytes) {
      setStatus('error')
      setErrorMessage('That file is larger than 50MB. Please choose a smaller zip.')
      return
    }

    setStatus('uploading')
    setErrorMessage('')
    try {
      await onFileSelected(file)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'That file could not be uploaded.')
    }
  }

  return (
    <div className="file-upload">
      <label htmlFor={inputId}>{label}</label>
      {helpText && <p className="file-upload__help">{helpText}</p>}
      <input id={inputId} type="file" accept=".zip" onChange={handleChange} disabled={status === 'uploading'} />
      {fileName && status === 'uploading' && <p role="status">Uploading {fileName}…</p>}
      {status === 'success' && <p role="status">{fileName} uploaded.</p>}
      {status === 'error' && <p role="alert" className="file-upload__error">{errorMessage}</p>}
    </div>
  )
}

export default FileUploadInput
