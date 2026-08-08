import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Project01 from './pages/projects/Project01'
import Project02 from './pages/projects/Project02'
import Project03 from './pages/projects/Project03'

export default function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works/project-01" element={<Project01 />} />
          <Route path="/works/project-02" element={<Project02 />} />
          <Route path="/works/project-03" element={<Project03 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
