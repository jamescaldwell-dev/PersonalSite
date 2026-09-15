import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'
import HomePage from './components/pages/HomePage'
import ResumePage from './components/pages/ResumePage'
import ProjectsPage from './components/pages/ProjectsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
