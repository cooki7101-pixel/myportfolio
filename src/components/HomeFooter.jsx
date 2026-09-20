import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../componentsStyle/home-footer.css'

// Home-Footer component set breakpoints (Figma):
// desktop >= 885px, tablet 682-884px, mobile <= 681px.
const TABLET_MIN_WIDTH = 682
const DESKTOP_MIN_WIDTH = 885

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < TABLET_MIN_WIDTH) return 'mobile'
  if (width < DESKTOP_MIN_WIDTH) return 'tablet'
  return 'desktop'
}

export default function HomeFooter({
  breakpoint,
  email = 'cooki7101@naver.com',
  copyright = '© 2026 Designed by Yeonsu Kim',
  // TODO: swap in the real LinkedIn link whenever it's ready.
  linkedinUrl = '#',
  resumeUrl = '/assets/resume.pdf',
  // TODO: point this at the real index/home page URL whenever it's ready.
  homeUrl = '/',
}) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState('desktop')

  useEffect(() => {
    const updateBreakpoint = () => setViewportBreakpoint(getViewportBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // `breakpoint` prop lets Storybook force a variant; otherwise it auto-detects from viewport width.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const mobile = resolvedBreakpoint === 'mobile'
  const tablet = resolvedBreakpoint === 'tablet'

  return <footer className={`home-footer home-footer--${mobile ? 'mobile' : tablet ? 'tablet' : 'desktop'}`} data-node-id={mobile ? '402:6852' : tablet ? '402:6757' : '376:1236'}>
    <div className="home-footer__contents">
      <div className="home-footer__top">
        <div className="home-footer__contact">
          <h2>Connect!<br />Get in touch<br />:)</h2>
          <a href={`mailto:${email}`}>{email}<img src="/assets/footer-icon.svg" alt="" /></a>
        </div>
        <nav>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">RESUME</a>
          <Link to="/about">ABOUT</Link>
          <Link to="/">WORK</Link>
        </nav>
      </div>
      <div className="home-footer__bottom">
        <Link to={homeUrl} aria-label="Portfolio home">
          <img src="/assets/footer-logo-desktop-white.svg" alt="김연수 포트폴리오" />
        </Link>
        <small>{copyright}</small>
      </div>
    </div>
  </footer>
}
