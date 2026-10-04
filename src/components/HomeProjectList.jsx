import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../componentsStyle/home-project-list.css'

const defaultProjects = [
  {
    tags: ['#AI검증', '#B2C', '#핀테크'],
    title: 'AI 티켓 사기 예방 ‘패싱’',
    description: 'SNS 티켓 거래의 사기 취약점을 해결해 AI 사전 검증으로 보호하는 티켓 거래 플랫폼',
    to: '/works/project-passing',
    video: `${import.meta.env.BASE_URL}assets/home-passing.mp4`,
  },
  {
    tags: ['#AI AGENT', '#SENIOR', '#REVAMP'],
    title: ['카카오T with 시니어 맞춤', 'AI 보이스 에이전트'],
    description: '디지털 사용에 어려움 겪는 시니어도 택시 호출을 끝까지 완료할 수 있도록 개선',
    to: '/works/kakao-t',
    video: `${import.meta.env.BASE_URL}assets/home-kakaot.mp4`,
  },
  {
    tags: ['#반응형', '#WEB', '#REVAMP'],
    title: '현대 자동차 홈페이지 개선',
    description: ['일관성 없는 레이아웃과 끊기는 구매흐름을', '반응형에 맞춰 재설계'],
    to: '/works/hyundai',
    video: `${import.meta.env.BASE_URL}assets/home-hyundai.mp4`,
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

// 카드 행이 들어오기 시작하는 가로 위치(화면 너비 기준): 0.8 = 화면 왼쪽에서 80% 지점 / 1 = 화면 오른쪽 끝 바깥
const ENTER_FROM = 0.65

export default function HomeProjectList({ projects = defaultProjects, id }) {
  const sectionRef = useRef(null)
  const trackWrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const trackWrap = trackWrapRef.current
    const track = trackRef.current
    if (!section || !trackWrap || !track) return

    const sticky = section.querySelector('.home-project-list__sticky')
    let startTranslate = 0
    let endTranslate = 0
    let progressFloor = 0
    let scrollSpan = 1
    let pinOffset = 0
    let rafId = null

    const measure = () => {
      // transform이 없는 상태에서 트랙의 원래 위치/너비를 측정합니다.
      track.style.transform = 'none'
      const viewportWidth = window.innerWidth
      const naturalStartX = track.getBoundingClientRect().left
      // 끝 위치: 카드 행이 화면을 넘치면 마지막 카드(+오른쪽 패딩)까지 보이도록 그만큼 왼쪽으로,
      // 안 넘치면 원래 자리에서 멈춥니다.
      const overflow = Math.max(naturalStartX + track.scrollWidth - viewportWidth, 0)
      endTranslate = -overflow
      // 시작 위치: 카드 행의 왼쪽 끝이 화면 오른쪽 바깥(화면 너비 지점)에 있는 상태 —
      // 스크롤하면 오른쪽에서 가로로 들어옵니다.
      startTranslate = Math.max(viewportWidth * ENTER_FROM - naturalStartX, endTranslate)
      // 모바일(681px 이하)은 이동 구간의 앞부분(floor)을 건너뛰고 시작합니다(값↑ = 처음부터 더 들어와 있음).
      progressFloor = viewportWidth <= 681 ? 0.9 : 0
      // 고정(sticky) 상태로 스크롤해야 하는 거리 = 실제 이동 거리. 섹션 높이를 "내용 높이 + 이동 거리"로
      // 딱 맞춰서 카드가 다 들어온 뒤 불필요한 빈 스크롤/여백이 생기지 않게 합니다.
      scrollSpan = Math.max((startTranslate - endTranslate) * (1 - progressFloor), 1)
      const stickyHeight = sticky.offsetHeight
      // 고정이 시작되는 스크롤 위치(pinOffset) 뒤부터 카드가 움직이도록 그만큼 섹션을 더 길게 잡습니다.
      pinOffset = Math.max(0, stickyHeight - window.innerHeight)
      section.style.height = `${stickyHeight + pinOffset + scrollSpan}px`
      // 화면(뷰포트) 높이가 고정 영역보다 낮을 때(개발자도구를 열었거나 가로로 눕힌 화면 등):
      // top:0에 붙으면 카드 아래쪽이 화면 밖에 잘린 채 고정돼서, 영역의 '아래쪽'이 화면 아래에 맞도록
      // 음수 top으로 고정합니다. 화면이 충분히 크면 0 그대로(맨 위에 고정).
      sticky.style.top = `${Math.min(0, window.innerHeight - stickyHeight)}px`
    }

    const update = () => {
      rafId = null
      const runway = startTranslate - endTranslate
      const rect = section.getBoundingClientRect()
      // 섹션이 화면 맨 위에 닿아 고정되는 순간부터 scrollSpan만큼 스크롤하는 동안 0→1
      const t = Math.min(Math.max((-rect.top - pinOffset) / scrollSpan, 0), 1)
      const progress = progressFloor + (1 - progressFloor) * t
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
    // 폰트/영상 로딩 등으로 고정 영역 높이가 바뀌면 섹션 높이도 다시 맞춥니다.
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    resizeObserver?.observe(sticky)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      resizeObserver?.disconnect()
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
