import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import '../componentsStyle/header.css'

// Header component set breakpoints (Figma, updated — a real tablet variant
// now exists at 682-1279px: same horizontal WORK/ABOUT/RESUME nav as
// desktop, just narrower side padding): desktop >= 1280px, tablet
// 682-1279px, mobile <= 681px.
const MOBILE_MAX_WIDTH = 681
const TABLET_MAX_WIDTH = 1279

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width <= MOBILE_MAX_WIDTH) return 'mobile'
  if (width <= TABLET_MAX_WIDTH) return 'tablet'
  return 'desktop'
}

// Mobile menu pattern referenced from noomoagency.com's mobile nav: a small
// text trigger opens a full-screen overlay with the nav links stacked large,
// plus a close control — rather than a dropdown. Tablet keeps the desktop's
// plain horizontal nav, just narrower.
export default function Header({ breakpoint, homeUrl = '/' }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState(getViewportBreakpoint)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateBreakpoint = () => setViewportBreakpoint(getViewportBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // `breakpoint` prop lets Storybook force a variant; otherwise it auto-detects from viewport width.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const isMobile = resolvedBreakpoint === 'mobile'
  const isTablet = resolvedBreakpoint === 'tablet'

  // Overlay should never be left open if the viewport grows back past mobile.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Lock page scroll while the full-screen overlay is open.
  useEffect(() => {
    if (!isMobile) return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobile, menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header header--${resolvedBreakpoint}${menuOpen ? ' header--menu-open' : ''}`} data-node-id="291:1660">
      <NavLink className="header__logo" to={homeUrl} aria-label="Portfolio home" onClick={closeMenu}>
        <Logo variant={isMobile ? 'mobile-black' : 'desktop-black'} alt="김연수 포트폴리오" />
      </NavLink>
      {isMobile ? (
        <>
          <button
            type="button"
            className="header__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="header-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
          <nav
            id="header-mobile-menu"
            className="header__overlay"
            aria-label="Main navigation"
            aria-hidden={!menuOpen}
          >
            <ol className="header__overlay-list">
              <li><NavLink to="/#work" onClick={closeMenu}>WORK</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
              <li><NavLink to="/resume" onClick={closeMenu}>RESUME</NavLink></li>
            </ol>
            <a className="header__overlay-cta" href="mailto:cooki7101@naver.com" onClick={closeMenu}>Let's work together?</a>
          </nav>
        </>
      ) : (
        <nav className="header__menu" aria-label="Main navigation">
          <NavLink to="/#work">WORK</NavLink><NavLink to="/about">ABOUT</NavLink><NavLink to="/resume">RESUME</NavLink>
        </nav>
      )}
    </header>
  )
}
