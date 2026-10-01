import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../componentsStyle/home-footer.css'

// Home-Footer 컴포넌트 브레이크포인트 (Figma 기준):
// 데스크탑 >= 885px, 태블릿 682-884px, 모바일 <= 681px.
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
  linkedinUrl = 'https://www.linkedin.com/in/김연수-undefined-87758841b',
  resumeUrl = `${import.meta.env.BASE_URL}assets/resume.pdf`,
  // TODO: 실제 index/홈 페이지 URL이 준비되면 교체할 것.
  homeUrl = '/',
}) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState('desktop')
  const location = useLocation()

  // 이미 home에 있는 상태에서 로고를 눌러도 react-router는 같은 경로로는
  // 다시 이동하지 않아 아무 반응이 없어 보였습니다 — 이미 home이면 맨 위로
  // 부드럽게 스크롤해서, 몇 번을 눌러도 계속 반응하게 합니다.
  const goHome = (event) => {
    const isAlreadyHome = location.pathname === homeUrl
    if (isAlreadyHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const updateBreakpoint = () => setViewportBreakpoint(getViewportBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // `breakpoint` prop으로 Storybook에서 특정 변형을 강제로 지정할 수 있고, 없으면 뷰포트 너비로 자동 감지함.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const mobile = resolvedBreakpoint === 'mobile'
  const tablet = resolvedBreakpoint === 'tablet'

  return <footer className={`home-footer home-footer--${mobile ? 'mobile' : tablet ? 'tablet' : 'desktop'}`} data-node-id={mobile ? '402:6852' : tablet ? '402:6757' : '376:1236'}>
    <div className="home-footer__contents">
      <div className="home-footer__top">
        <div className="home-footer__contact">
          <h2>Connect!<br />Get in touch<br />:)</h2>
          <a href={`mailto:${email}`}>{email}<img src={`${import.meta.env.BASE_URL}assets/footer-icon.svg`} alt="" /></a>
        </div>
        <nav>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">RESUME</a>
          <Link to="/about">ABOUT</Link>
          <Link to="/">WORK</Link>
        </nav>
      </div>
      <div className="home-footer__bottom">
        <Link to={homeUrl} aria-label="Portfolio home" onClick={goHome}>
          <img src={`${import.meta.env.BASE_URL}assets/footer-logo-desktop-white.svg`} alt="김연수 포트폴리오" />
        </Link>
        <small>{copyright}</small>
      </div>
    </div>
  </footer>
}
