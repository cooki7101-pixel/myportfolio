import { useEffect, useState } from 'react'
import '../componentsStyle/hero.css'

const defaultLink = 'https://elevenlabs.io/app/talk-to?agent_id=agent_4501kp8tgvtpfbr89kggzevxk31s&branch_id=agtbrch_8501kp8tgw3zexcrpp0ywnx3cd9c'

// Hero component set breakpoints (Figma): desktop >= 1280px, laptop 990-1279px,
// tablet 722-989px, mobile 360-721px.
function getViewportBreakpoint() {
  if (typeof window === 'undefined') return '기본'
  const width = window.innerWidth
  if (width < 722) return 'mobile'
  if (width < 990) return 'tablet'
  if (width < 1280) return 'laptop'
  return '기본'
}

export default function Hero({
  breakpoint,
  title = 'AI 티켓 사기 예방 ‘패싱’',
  showTitleLink = false,
  titleLink = defaultLink,
  mediaType = 'video',
  mediaSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  children,
}) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState('기본')

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
  const isLaptop = resolvedBreakpoint === 'laptop'

  return <section className={`hero hero--${isMobile ? 'mobile' : isTablet ? 'tablet' : isLaptop ? 'laptop' : 'desktop'}`} data-node-id="348:4017">
    <div className="hero__title-wrap">
      <h1>{title}</h1>
      {showTitleLink && <a href={titleLink} target="_blank" rel="noreferrer">보이스 에이전트 체험해보기 <img src="/assets/title-link-right-arrow.svg" alt="" /></a>}
    </div>
    <div className="hero__media">{children || (mediaType === 'img' ? <img src={mediaSrc} alt="" /> : <video autoPlay muted loop playsInline preload="auto" aria-label="Hero video"><source src={mediaSrc} /></video>)}</div>
  </section>
}
