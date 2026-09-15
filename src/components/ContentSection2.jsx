import { useEffect, useState } from 'react'
import SectionIntro from './SectionIntro'
import '../componentsStyle/content-section2.css'

// ContentSection2 switches to the mobile variant once the viewport drops to 1199px or below.
const MOBILE_MAX_WIDTH = 1199

function getViewportBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  return window.innerWidth <= MOBILE_MAX_WIDTH ? 'mobile' : 'desktop'
}

export default function ContentSection2({ breakpoint, items = [], eyebrow, title, description }) {
  const [viewportBreakpoint, setViewportBreakpoint] = useState(getViewportBreakpoint)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const updateBreakpoint = () => setViewportBreakpoint(mediaQuery.matches ? 'mobile' : 'desktop')
    updateBreakpoint()
    mediaQuery.addEventListener('change', updateBreakpoint)
    return () => mediaQuery.removeEventListener('change', updateBreakpoint)
  }, [])

  // `breakpoint` prop lets Storybook force a variant; otherwise it auto-detects from viewport width.
  const resolvedBreakpoint = breakpoint ?? viewportBreakpoint
  const media = ({ type = 'img', src, component }) => component || (src ? (type === 'video' ? <video autoPlay muted loop playsInline preload="auto"><source src={src} /></video> : <img src={src} alt="" />) : <div className="content-section2__placeholder" />)
  const visibleItems = items.slice(0, 3)
  return <section className={`content-section2 content-section2--${resolvedBreakpoint}`} data-node-id="360:5623">
    <SectionIntro {...(eyebrow !== undefined && { eyebrow })} {...(title !== undefined && { title })} {...(description !== undefined && { description })} />
    <div className="content-section2__group"><div className="content-section2__row">
      {visibleItems.slice(0, 2).map((item, index) => <figure key={`${item.label || 'media'}-${index}`}><div className="content-section2__media">{media(item)}</div>{item.label && <figcaption>{item.label}</figcaption>}</figure>)}
    </div>{visibleItems[2] && <div className="content-section2__wide"><div className="content-section2__media">{media(visibleItems[2])}</div>{visibleItems[2].label && <figcaption>{visibleItems[2].label}</figcaption>}</div>}</div>
  </section>
}
