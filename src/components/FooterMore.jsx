import '../componentsStyle/footer-more.css'

const defaultProjects = [
  { type: 'img', src: '/assets/buyer-mapping.png', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' },
  { type: 'img', src: '/assets/seller-mapping.png', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' },
]

export default function FooterMore({ breakpoint = 'desktop', projects = defaultProjects, copyright = '© 2026 Designed by Yeonsu Kim' }) {
  const isTablet = breakpoint === 'tablet'
  return <footer className={`footer-more footer-more--${isTablet ? 'tablet' : 'desktop'}`} data-node-id="348:4709">
    <div className="footer-more__contents"><section className="footer-more__projects"><h2>MORE PROJECTS</h2><div className="footer-more__grid">{(Array.isArray(projects) ? projects : []).slice(0, 2).map((project, index) => { const label = project.label || project.title || ''; return <article key={`${label}-${index}`}><div className="footer-more__media">{project.component || (project.type === 'video' ? <video autoPlay muted loop playsInline preload="auto" aria-label={label}><source src={project.src} /></video> : <img src={project.src} alt="" />)}</div><h3>{label}</h3></article> })}</div></section><div className="footer-more__bottom"><img src="/assets/footer-logo-desktop-white.svg" alt="김연수 포트폴리오" /><small>{copyright}</small></div></div>
  </footer>
}
