import './App.css'
import { useEffect, useState } from 'react'
import AboutPage from './components/pages/AboutPage'
import HomePage from './components/pages/HomePage'
import ResumePage from './components/pages/ResumePage'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash.startsWith('#resume')) return <ResumePage />
  if (currentHash.startsWith('#about-james')) return <AboutPage />

  return <HomePage />
}

export default App
