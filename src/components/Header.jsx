import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import '../componentsStyle/header.css'

// Header 컴포넌트 브레이크포인트 (Figma 기준, 업데이트됨 — 682-1279px에
// 실제 태블릿 변형이 추가됨: 데스크탑과 동일한 가로형 WORK/ABOUT/RESUME
// 내비게이션에 좌우 패딩만 좁게): 데스크탑 >= 1280px, 태블릿
// 682-1279px, 모바일 <= 681px.
const MOBILE_MAX_WIDTH = 681
const TABLET_MAX_WIDTH = 1279

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width <= MOBILE_MAX_WIDTH) return 'mobile'
  if (width <= TABLET_MAX_WIDTH) return 'tablet'
  return 'desktop'
}

// 모바일 메뉴 패턴은 noomoagency.com의 모바일 내비게이션을 참고함: 작은
// 텍스트 트리거를 누르면 드롭다운이 아니라 전체화면 오버레이가 열리고,
// 그 안에 내비 링크들이 크게 세로로 쌓이며 닫기 버튼이 함께 표시됨.
// 태블릿은 데스크탑과 같은 가로형 내비를 그대로 쓰되 폭만 좁게 유지함.
export default function Header({ breakpoint, homeUrl = '/' }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState(getViewportBreakpoint)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const updateBreakpoint = () => setViewportBreakpoint(getViewportBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // `breakpoint` prop으로 Storybook에서 특정 변형을 강제로 지정할 수 있고, 없으면 뷰포트 너비로 자동 감지함.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const isMobile = resolvedBreakpoint === 'mobile'
  const isTablet = resolvedBreakpoint === 'tablet'

  // 뷰포트가 다시 모바일 폭 이상으로 커지면 오버레이가 열린 채로 남아있지 않도록 함.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // 전체화면 오버레이가 열려 있는 동안에는 페이지 스크롤을 잠금.
  useEffect(() => {
    if (!isMobile) return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobile, menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // 로고는 어느 페이지에서 눌러도 항상 홈으로 이동해야 합니다. 이미
  // 홈(homeUrl)에 있을 때는 NavLink가 같은 경로라서 아무 일도 안
  // 일어나므로, 이 경우엔 페이지를 완전히 새로고침합니다.
  const goHome = (event) => {
    closeMenu()
    const isAlreadyHome = location.pathname === homeUrl.split('#')[0].split('?')[0]
    if (isAlreadyHome) {
      event.preventDefault()
      window.location.href = homeUrl
    }
  }

  // 이미 "/"+"#work"에 있는 상태(예: WORK를 눌러 스크롤한 뒤 다시 히어로로
  // 스크롤해서 올라온 경우)에서 WORK를 다시 누르면, 경로/해시가 그대로라
  // react-router가 아무 변화도 감지하지 못해 Home의 해시 감지 effect가
  // 다시 실행되지 않고, 그래서 스크롤도 다시 일어나지 않았습니다 — 이미
  // 같은 위치일 때는 직접 스크롤을 실행해서 항상 동작하게 합니다.
  const goToWork = (event) => {
    closeMenu()
    const isAlreadyOnWork = location.pathname === '/' && location.hash === '#work'
    if (isAlreadyOnWork) {
      event.preventDefault()
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`header header--${resolvedBreakpoint}${menuOpen ? ' header--menu-open' : ''}`} data-node-id="291:1660">
      <NavLink className="header__logo" to={homeUrl} aria-label="Portfolio home" onClick={goHome}>
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
              <li><NavLink to="/#work" onClick={goToWork}>WORK</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
              <li><a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>RESUME</a></li>
            </ol>
            <a className="header__overlay-cta" href="mailto:cooki7101@naver.com" onClick={closeMenu}>Let's work together?</a>
          </nav>
        </>
      ) : (
        <nav className="header__menu" aria-label="Main navigation">
          <NavLink to="/#work" onClick={goToWork}>WORK</NavLink><NavLink to="/about">ABOUT</NavLink><a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
        </nav>
      )}
    </header>
  )
}
