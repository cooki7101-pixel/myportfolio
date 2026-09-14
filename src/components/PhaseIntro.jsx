import { useEffect, useState } from 'react'
import '../componentsStyle/phase-intro.css'

// Phase-intro component set breakpoints (Figma): desktop >= 990px, tablet 722-989px, mobile 360-721px.
function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 722) return 'mobile'
  if (width < 990) return 'tablet'
  return 'desktop'
}

export default function PhaseIntro({
  breakpoint,
  desc = "왜 사용자는 '사기 위험'을 알면서도 X(트위터)에서의 티켓 거래를 멈추지 못할까?",
  headline = '“Why do users keep trading Tickets on x(Twitter) despite the risk of scams?”',
  title = 'EMPATHIZE',
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

  return (
    <section className={`phase-intro phase-intro--${resolvedBreakpoint}`} data-node-id="348:5141">
      <p className="phase-intro__title">{title}</p>
      <div className="phase-intro__contents">
        <p className="phase-intro__headline">{headline}</p>
        <p className="phase-intro__description">{desc}</p>
      </div>
    </section>
  )
}
