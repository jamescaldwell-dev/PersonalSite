import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'

// /get-started (project intake wizard) is temporarily disabled — not linked from the UI or routed.
const SupportViewPage = lazy(() => import('./components/pages/SupportViewPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/support/:code" element={<SupportViewPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
