import { useEffect, useState } from 'react'
import '../componentsStyle/footer-more.css'

const defaultProjects = [
  { type: 'img', src: '/assets/buyer-mapping.png', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' },
  { type: 'img', src: '/assets/seller-mapping.png', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' },
]

// FooterMore component set breakpoints (Figma, updated): desktop >= 990px, tablet 722-989px, mobile <= 721px.
const MOBILE_MAX_WIDTH = 721
const TABLET_MAX_WIDTH = 989

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width <= MOBILE_MAX_WIDTH) return 'mobile'
  if (width <= TABLET_MAX_WIDTH) return 'tablet'
  return 'desktop'
}

export default function FooterMore({ breakpoint, projects = defaultProjects, copyright = '© 2026 Designed by Yeonsu Kim' }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState(getViewportBreakpoint)

  useEffect(() => {
    const updateBreakpoint = () => setViewportBreakpoint(getViewportBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // `breakpoint` prop lets Storybook force a variant; otherwise it auto-detects from viewport width.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint

  return <footer className={`footer-more footer-more--${resolvedBreakpoint}`} data-node-id="348:4709">
    <div className="footer-more__contents"><section className="footer-more__projects"><h2>MORE PROJECTS</h2><div className="footer-more__grid">{(Array.isArray(projects) ? projects : []).slice(0, 2).map((project, index) => { const label = project.label || project.title || ''; return <article key={`${label}-${index}`}><div className="footer-more__media">{project.component || (project.type === 'video' ? <video autoPlay muted loop playsInline preload="auto" aria-label={label}><source src={project.src} /></video> : <img src={project.src} alt="" />)}</div><h3>{label}</h3></article> })}</div></section><div className="footer-more__bottom"><img src="/assets/footer-logo-desktop-white.svg" alt="김연수 포트폴리오" /><small>{copyright}</small></div></div>
  </footer>
}
