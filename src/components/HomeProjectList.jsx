import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../componentsStyle/home-project-list.css'

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
    to: '/works/hyundai',
    video: '/assets/home-hyundai.mp4',
  },
]

// 제목과 설명은 문자열 또는 여러 줄을 담은 배열로 받을 수 있습니다.
// 배열로 전달된 내용은 각 항목 사이에 줄바꿈을 넣어 표시합니다.
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
        // 프로젝트 데이터에 video 경로가 있으면 미리보기 영상을 표시합니다.
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

// 섹션 자체를 긴 스크롤 구간으로 만들고, 내부 콘텐츠를 화면에 고정합니다.
// 사용자가 스크롤하는 동안 카드 트랙은 왼쪽으로 이동합니다.
//
// 종료 위치는 트랙이 래퍼 밖으로 넘치는 거리만큼 이동한 위치입니다.
// 카드 이동은 transform으로 처리하며, 모든 화면 크기에서 같은 방식으로 동작합니다.

export default function HomeProjectList({ projects = defaultProjects, id }) {
  const sectionRef = useRef(null)
  const trackWrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const trackWrap = trackWrapRef.current
    const track = trackRef.current
    if (!section || !trackWrap || !track) return

    let startTranslate = 0
    let endTranslate = 0
    let rafId = null

    const measure = () => {
      // transform이 적용되지 않은 상태에서 트랙의 실제 너비를 측정합니다.
      track.style.transform = 'none'
      // 트랙이 래퍼를 넘어가는 전체 오버플로 거리를 계산합니다.

      // 초기 보여질 영역까지를 계산한다
      const overflow = Math.max(track.scrollWidth - trackWrap.clientWidth, 0)
      endTranslate = -overflow
      // 화면 너비만큼 오른쪽에서 시작해 스크롤 중 왼쪽으로 진입하게 합니다.
      const entranceDistance = trackWrap.clientWidth;
      startTranslate = endTranslate + entranceDistance
      section.style.height = `${window.innerHeight + entranceDistance}px`
    }

    const update = () => {
      rafId = null
      if (startTranslate === endTranslate) return
      // 섹션의 현재 스크롤 진행률을 계산해 트랙 위치를 갱신합니다.
      const rect = section.getBoundingClientRect()
      const runway = startTranslate - endTranslate

      // 여기 위치의 0.2~0.9 구간에서만 트랙이 이동하도록 제한합니다.
      const progress = Math.min(Math.max(-rect.top / runway, 0.2), 0.9)

      track.style.transform = `translateX(${startTranslate - progress * runway}px)`
    }

    const onScroll = () => {
      if (rafId) return
      // 스크롤 이벤트마다 바로 계산하지 않고 한 프레임에 한 번만 갱신합니다.
      rafId = requestAnimationFrame(update)
    }

    const onResize = () => {
      // 화면 크기가 바뀌면 카드 너비와 스크롤 구간을 다시 계산합니다.
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
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
