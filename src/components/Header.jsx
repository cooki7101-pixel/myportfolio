import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LiquidGlass } from '../lib/quidlass.esm.js'
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
      // 이미 홈(예: WORK 섹션까지 스크롤한 상태)이면 새로고침 대신 히어로가
      // 있는 맨 위로 부드럽게 스크롤합니다.
      event.preventDefault()
      if (window.scrollY < 10) {
        // 이미 hero 맨 위라면 스크롤할 곳이 없어 아무 반응이 없어 보이므로,
        // 현재 주소 그대로 새로고침해서 인트로를 다시 보여줍니다.
        window.location.reload()
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // 이미 홈("/")에 있으면 같은 경로라 라우터가 변화를 감지하지 못하므로 직접
  // 스크롤하고, 다른 페이지에서는 NavLink가 state(scrollTo)와 함께 홈으로
  // 이동해 Home이 WORK 섹션으로 스크롤합니다 — 주소에 "#work"는 붙지 않습니다.
  const goToWork = (event) => {
    closeMenu()
    if (location.pathname === '/') {
      event.preventDefault()
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 로고·메뉴(글자) 부분. 두 번 그립니다:
  //  1) 헤더 안에 투명(visibility:hidden)한 자리 확보용 복사본 — 헤더 높이/배치를 그대로 유지
  //  2) 헤더 바깥의 .header-invert 레이어에 실제 동작하는 버전 — 이 레이어에 mix-blend-mode를 걸어서
  //     페이지 뒤 요소와 색이 반전되게 합니다(헤더 안쪽에서는 뒤 페이지와 섞이지 않아서 따로 뺐습니다).
  const bar = (
    <>
      <NavLink className="header__logo" to={homeUrl} aria-label="Portfolio home" onClick={goHome}>
        <Logo variant={isMobile ? 'mobile-black' : 'desktop-black'} alt="김연수 포트폴리오" />
      </NavLink>
      {isMobile ? (
        <button
          type="button"
          className="header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="header-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      ) : (
        <nav className="header__menu" aria-label="Main navigation">
          <NavLink to="/" state={{ scrollTo: 'work' }} onClick={goToWork}>WORK</NavLink><NavLink to="/about">ABOUT</NavLink><a href={`${import.meta.env.BASE_URL}assets/resume.pdf`} target="_blank" rel="noopener noreferrer">RESUME</a>
        </nav>
      )}
    </>
  )

  return (
    <>
    <header className={`header header--${resolvedBreakpoint}${menuOpen ? ' header--menu-open' : ''}`} data-node-id="291:1660">
      {/* 헤더 뒤에 깔리는 유리 효과 전용 레이어(모션 없음) — 헤더 자체에
          backdrop-filter가 걸려 있으면 그 안쪽 유리가 뒤를 못 봐서, 기존
          헤더의 backdrop-filter/배경은 header.css에서 걷어내고 이 레이어가
          대신 담당합니다. 모바일 메뉴가 열려 있을 땐 숨깁니다. */}
      {!menuOpen && (
        <div className="header__glass" aria-hidden="true">
          <LiquidGlass
              borderRadius={0}
              blur={5}
              contrast={1.0}
              brightness={1.02}
              saturation={1.0}
              shadowIntensity={0.28}
              elasticity={0.27}
              elasticityActivationZone={100}
              swirlIntensity={11.3}
              swirlScale={2.0}
              swirlRadius={0.3}
              edgeThicknessPx={20}
              swirlEdges="all"
              zIndex={3}
              style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div style={{ width: '100%', height: '100%' }} />
          </LiquidGlass>
        </div>
      )}
      <div className="header__ghost" aria-hidden="true" inert="">
        {bar}
      </div>
      {isMobile && (
        <nav
          id="header-mobile-menu"
          className="header__overlay"
          aria-label="Main navigation"
          aria-hidden={!menuOpen}
        >
          <ol className="header__overlay-list">
            <li><NavLink to="/" state={{ scrollTo: 'work' }} onClick={goToWork}>WORK</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
            <li><a href={`${import.meta.env.BASE_URL}assets/resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>RESUME</a></li>
          </ol>
          <a className="header__overlay-cta" href="mailto:cooki7101@naver.com" onClick={closeMenu}>Let's work together?</a>
        </nav>
      )}
    </header>
    <div className={`header-invert header--${resolvedBreakpoint}${menuOpen ? ' header--menu-open' : ''}`}>
      {bar}
    </div>
    {/* 로고 검정을 더 진하게 하는 보조 레이어 (color-burn) — 로고 모양만 보이고 클릭/포커스는 안 받음 */}
    <div className={`header-burn header--${resolvedBreakpoint}${menuOpen ? ' header--menu-open' : ''}`} aria-hidden="true" inert="">
      {bar}
    </div>
    </>
  )
}
