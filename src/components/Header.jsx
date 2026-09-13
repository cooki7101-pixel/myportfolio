import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import '../componentsStyle/header.css'

// Header component set breakpoints (Figma): desktop >= 682px, mobile <= 681px.
const MOBILE_MAX_WIDTH = 681

export default function Header({ breakpoint }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState('desktop')

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const updateBreakpoint = () => setViewportBreakpoint(mediaQuery.matches ? 'mobile' : 'desktop')
    updateBreakpoint()
    mediaQuery.addEventListener('change', updateBreakpoint)
    return () => mediaQuery.removeEventListener('change', updateBreakpoint)
  }, [])

  // `breakpoint` prop lets Storybook force a variant; otherwise it auto-detects from viewport width.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const isMobile = resolvedBreakpoint === 'mobile'

  return (
    <header className={`header header--${isMobile ? 'mobile' : 'desktop'}`} data-node-id="291:1660">
      <NavLink className="header__logo" to="/" aria-label="Portfolio home">
        <Logo variant={isMobile ? 'mobile-black' : 'desktop-black'} alt="김연수 포트폴리오" />
      </NavLink>
      <nav className="header__menu" aria-label="Main navigation">
        {isMobile ? <NavLink to="/">MENU</NavLink> : <><NavLink to="/">WORK</NavLink><NavLink to="/about">ABOUT</NavLink><NavLink to="/resume">RESUME</NavLink></>}
      </nav>
    </header>
  )
}
