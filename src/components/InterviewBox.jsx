import { useEffect, useState } from 'react'
import '../componentsStyle/interview-box.css'

const defaultItems = [
  { type: 'img', src: '/assets/interview-script.png', label: '인터뷰 스크립트' },
  // TODO: AFFINITY MAPPING is a video slot in Figma but no footage has been uploaded there yet — shows a placeholder until a real src is provided.
  { type: 'video', label: 'AFFINITY MAPPING' },
  { type: 'img', src: '/assets/buyer-mapping.png', label: '구매자 매핑 인사이트' },
  { type: 'img', src: '/assets/seller-mapping.png', label: '판매자 매핑 인사이트' },
]

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  return window.innerWidth <= 721 ? 'mobile' : 'desktop'
}

export default function InterviewBox({ breakpoint, items = defaultItems }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState(getViewportBreakpoint)

  useEffect(() => {
    const handleResize = () => setViewportBreakpoint(getViewportBreakpoint())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const isMobile = resolvedBreakpoint === 'mobile'
  return <section className={`interview-box interview-box--${isMobile ? 'mobile' : 'desktop'}`} data-node-id="367:6498">
    {items.slice(0, 4).map(({ type = 'img', src, component, label }, index) => <figure className="interview-box__item" key={`${label}-${index}`}>
      <div className="interview-box__media">{component || (src ? (type === 'video' ? <video autoPlay muted loop playsInline preload="auto" aria-label={label}><source src={src} /></video> : <img src={src} alt="" />) : <div className="interview-box__placeholder" />)}</div>
      <figcaption>{label}</figcaption>
    </figure>)}
  </section>
}
