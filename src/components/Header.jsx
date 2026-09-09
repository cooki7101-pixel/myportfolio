import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import '../componentsStyle/header.css'

export default function Header({ breakpoint = 'desktop' }) {
  const isMobile = breakpoint === 'mobile'

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
