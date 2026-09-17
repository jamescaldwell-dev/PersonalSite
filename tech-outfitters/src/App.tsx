import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'

const GetStartedPage = lazy(() => import('./components/pages/GetStartedPage'))
const SupportViewPage = lazy(() => import('./components/pages/SupportViewPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/support/:code" element={<SupportViewPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
