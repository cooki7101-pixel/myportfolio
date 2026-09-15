import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../componentsStyle/home-project-list.css'

gsap.registerPlugin(ScrollTrigger)

const defaultProjects = [
  {
    tags: ['#AI검증', '#B2C', '#핀테크'],
    title: 'AI 티켓 사기 예방 ‘패싱’',
    description: 'SNS 티켓 거래의 사기 취약점을 해결해 AI 사전 검증으로 보호하는 티켓 거래 플랫폼',
    to: '/works/project-passing',
    video: '/assets/home-passing.mp4',
  },
  {
    tags: ['#AI AGENT', '#SENIOR', '#REVAMP'],
    title: ['카카오T with 시니어 맞춤', 'AI 보이스 에이전트'],
    description: '디지털 사용에 어려움 겪는 시니어도 택시 호출을 끝까지 완료할 수 있도록 개선',
    to: '/works/kakao-t',
    video: '/assets/home-kakaot.mp4',
  },
  {
    tags: ['#반응형', '#WEB', '#REVAMP'],
    title: '현대자동차 홈페이지 개선',
    description: ['일관성 없는 레이아웃과 끊기는 구매흐름을', '반응형에 맞춰 재설계'],
    to: '#',
    video: '/assets/home-hyundai.mp4',
  },
]

// title/description accept either a plain string or an array of lines
// (rendered with <br/> between them) for manual line breaks like the ones
// above.
function Lines({ text }) {
  if (!Array.isArray(text)) return text
  return text.map((line, index) => (
    <span key={index}>
      {line}
      {index < text.length - 1 && <br />}
    </span>
  ))
}

function HomeProjectCard({ tags, title, description, to, image, video }) {
  return (
    <Link className="home-project-list__card" to={to}>
      {video ? (
        // Real project preview video goes here — just set `video` on the project data above.
        <video className="home-project-list__media" src={video} autoPlay muted loop playsInline preload="auto" />
      ) : (
        <div className="home-project-list__media" style={image ? { backgroundImage: `url(${image})` } : undefined} />
      )}
      <div className="home-project-list__gradient" />
      <div className="home-project-list__tags">
        {tags.map((tag, index) => (
          <span className="home-project-list__tag" key={`${tag}-${index}`}>{tag}</span>
        ))}
      </div>
      <div className="home-project-list__contents">
        <p className="home-project-list__title"><Lines text={title} /></p>
        <p className="home-project-list__description"><Lines text={description} /></p>
      </div>
    </Link>
  )
}

// Pinned scroll-in pattern (like heynesh.com's project section): the outer
// <section> is a tall "scroll runway", the middle layer sticks to the
// viewport while its scroll offset is still inside that runway, and the
// card track slides left as the user scrolls through the runway.
//
// The end position is just a full reveal of the row's own overflow past its
// wrapper (trackWrap) — not forced to land exactly on a 40px gutter. Like
// heynesh's own project section, a card can sit mid-scroll partially off
// the edge; the point is continuous scroll-driven motion, not a snap-to-fit
// finish. Nothing is clipped/hidden with CSS overflow to achieve this —
// it's purely a transform, the full row is always in the DOM and paintable.
// Runs at every breakpoint — per the reference, the pinned/scroll-jacked
// entrance motion is the same at desktop, tablet AND mobile, only the card
// size shrinks (see the breakpoint sizing in home-project-list.css).

export default function HomeProjectList({ projects = defaultProjects, id }) {
  const sectionRef = useRef(null)
  const trackWrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const trackWrap = trackWrapRef.current
    const track = trackRef.current
    if (!section || !trackWrap || !track) return

    let trigger

    const setupScrollAnimation = () => {
      // Clear the previous transform before measuring the natural row width.
      gsap.set(track, { x: 0 })
      const overflow = Math.max(track.scrollWidth - trackWrap.clientWidth, 0)
      const entranceDistance = trackWrap.clientWidth
      const endTranslate = -overflow
      const startTranslate = endTranslate + entranceDistance

      section.style.height = `${window.innerHeight + entranceDistance}px`
      trigger?.kill()
      gsap.killTweensOf(track)

      if (startTranslate === endTranslate) return

      gsap.set(track, { x: startTranslate })
      trigger = gsap.to(track, {
        x: endTranslate,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${entranceDistance}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      }).scrollTrigger
    }

    setupScrollAnimation()
    const onResize = () => {
      setupScrollAnimation()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      trigger?.kill()
      gsap.killTweensOf(track)
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [])

  return (
    <section className="home-project-list" id={id} ref={sectionRef} data-node-id="380:2887">
      <div className="home-project-list__sticky">
        <h2 className="home-project-list__heading">WORK</h2>
        <div className="home-project-list__track-wrap" ref={trackWrapRef}>
          <div className="home-project-list__grid" ref={trackRef}>
            {projects.map((project, index) => (
              <HomeProjectCard key={`${index}-${Array.isArray(project.title) ? project.title.join(' ') : project.title}`} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
