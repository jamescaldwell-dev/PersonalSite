import './App.css'
import { useEffect, useState } from 'react'
import HomePage from './components/pages/HomePage'
import ResumePage from './components/pages/ResumePage'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return currentHash.startsWith('#resume') ? <ResumePage /> : <HomePage />
}

export default App
