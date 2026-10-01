import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../componentsStyle/home-project-list.css'

const defaultProjects = [
  {
    tags: ['#AI검증', '#B2C', '#핀테크'],
    title: 'AI 티켓 사기 예방 ‘패싱’',
    description: 'SNS 티켓 거래의 사기 취약점을 해결해 AI 사전 검증으로 보호하는 티켓 거래 플랫폼',
    to: '/works/project-passing',
<<<<<<< HEAD
    video: `${import.meta.env.BASE_URL}assets/home-passing.mp4`,
=======
    video: '/assets/home-passing.mp4',
>>>>>>> master
  },
  {
    tags: ['#AI AGENT', '#SENIOR', '#REVAMP'],
    title: ['카카오T with 시니어 맞춤', 'AI 보이스 에이전트'],
    description: '디지털 사용에 어려움 겪는 시니어도 택시 호출을 끝까지 완료할 수 있도록 개선',
    to: '/works/kakao-t',
<<<<<<< HEAD
    video: `${import.meta.env.BASE_URL}assets/home-kakaot.mp4`,
=======
    video: '/assets/home-kakaot.mp4',
>>>>>>> master
  },
  {
    tags: ['#반응형', '#WEB', '#REVAMP'],
    title: '현대자동차 홈페이지 개선',
    description: ['일관성 없는 레이아웃과 끊기는 구매흐름을', '반응형에 맞춰 재설계'],
    to: '/works/hyundai',
<<<<<<< HEAD
    video: `${import.meta.env.BASE_URL}assets/home-hyundai.mp4`,
=======
    video: '/assets/home-hyundai.mp4',
>>>>>>> master
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
<<<<<<< HEAD
=======
    let progressFloor = 0.4
>>>>>>> master
    let rafId = null

    const measure = () => {
      // transform이 적용되지 않은 상태에서 트랙의 실제 너비를 측정합니다.
      track.style.transform = 'none'
      // 트랙이 래퍼를 넘어가는 전체 오버플로 거리를 계산합니다.
<<<<<<< HEAD

      // 초기 보여질 영역까지를 계산한다
      const overflow = Math.max(track.scrollWidth - trackWrap.clientWidth, 0)
      endTranslate = -overflow
      // 화면 너비만큼 오른쪽에서 시작해 스크롤 중 왼쪽으로 진입하게 합니다.
      const entranceDistance = trackWrap.clientWidth;
      startTranslate = endTranslate + entranceDistance
      section.style.height = `${window.innerHeight + entranceDistance}px`
=======
      //
      // trackWrap 자체는 WORK 헤딩과 왼쪽을 맞추려고 max-width:1200으로
      // 좁혀뒀지만(home-project-list.css), 오버플로 판단은 그 1200 박스가
      // 아니라 실제 화면 전체 너비(window.innerWidth) 기준으로 합니다 —
      // 그래야 카드 3개처럼 실제 화면 안에 다 들어오는 경우에는(overflow
      // <= 0) 왼쪽에 고정된 채 오른쪽으로 자연스럽게 넘쳐 보이기만 하고,
      // 나중에 프로젝트가 늘어나 실제 화면 너비보다 카드 행이 넓어지는
      // 순간부터는 자동으로 다시 왼쪽으로 슬라이드하며 나머지를 보여주게
      // 됩니다.
      // trackWrap이 1200 박스 안에서 가운데 정렬되며 생기는 왼쪽 여백만큼
      // 트랙의 "원래(transform 없는) 시작 x좌표"가 0이 아니라 화면
      // 오른쪽으로 밀려 있습니다 — 이 오프셋(naturalStartX)을 빼지 않으면
      // 스크롤을 끝까지 해도 카드 행 끝부분(과 방금 추가한 오른쪽 40px
      // 패딩)이 그만큼 화면 밖으로 밀려나가, 마지막 카드가 잘리거나
      // 오른쪽 여백이 의도한 40px보다 더 커 보였습니다.
      const viewportWidth = window.innerWidth
      const naturalStartX = track.getBoundingClientRect().left
      const overflow = Math.max(naturalStartX + track.scrollWidth - viewportWidth, 0)
      endTranslate = -overflow
      // 화면 너비만큼 오른쪽에서 시작해 스크롤 중 왼쪽으로 진입하게 합니다.
      const entranceDistance = viewportWidth;
      startTranslate = endTranslate + entranceDistance

      // 아래 update()의 0.4는 "카드 행 너비가 화면 너비와 비슷한" 데스크탑
      // 기준으로 잡힌 값이라, 반응형처럼 카드 행이 화면보다 훨씬 넓어지는
      // 좁은 화면에서는 스크롤을 시작하자마자 이 0.4만큼 이미 왼쪽으로
      // 당겨진 채로 시작해버려서 카드 행이 화면 왼쪽 바깥으로 잘린 채
      // 등장하는 문제가 있었습니다 — 0.4를 그대로 적용했을 때 트랙이
      // 원래 시작 위치(naturalStartX, 화면 밖 오른쪽)보다 더 왼쪽으로
      // 넘어가 버리는 경우, 그만큼 자동으로 낮춰서 항상 화면 오른쪽에서만
      // 시작하도록 안전하게 계산합니다. 데스크탑처럼 원래도 괜찮았던
      // 경우엔 그대로 0.4가 유지됩니다.
      const naturalFloor = entranceDistance > 0 ? 1 - overflow / entranceDistance : 0.4
      // 모바일(681px 이하)은 자동 계산되는 naturalFloor 대신 고정값을
      // 직접 써서, 화면 크기와 무관하게 원하는 지점부터 카드가 움직이게
      // 합니다 — 값을 낮출수록 스크롤 시작 직후 더 빨리 슬라이드합니다.
      const isMobile = viewportWidth <= 681
      progressFloor = isMobile ? 0.9 : Math.max(0, Math.min(0.9, naturalFloor))
      // 여유 버퍼(120px) — 정확히 필요한 만큼만 높이를 주면 레이아웃/폰트
      // 로딩 타이밍에 따라 섹션이 필요한 스크롤 거리보다 살짝 짧게
      // 측정되어 카드 행이 완전히 자리잡기 전에 sticky가 풀려버릴 수
      // 있음 — 그래서 카드 하단이 잘려 보이는 것처럼 느껴짐.
      section.style.height = `${window.innerHeight + entranceDistance + 140}px`
>>>>>>> master
    }

    const update = () => {
      rafId = null
      if (startTranslate === endTranslate) return
      // 섹션의 현재 스크롤 진행률을 계산해 트랙 위치를 갱신합니다.
      const rect = section.getBoundingClientRect()
      const runway = startTranslate - endTranslate

<<<<<<< HEAD
      // 여기 위치의 0.2~0.9 구간에서만 트랙이 이동하도록 제한합니다.
      const progress = Math.min(Math.max(-rect.top / runway, 0.2), 0.9)
=======
      // 여기 위치의 0.4~1 구간에서만 트랙이 이동하도록 제한합니다 — 시작
      // 지점을 더 왼쪽으로(0.2 → 0.4) 당겨서 처음부터 더 안쪽에서
      // 보이게 하고, 끝 지점은 1까지 채워서 스크롤이 끝나면 트랙이 화면
      // 왼쪽 끝까지 다 밀려 잘리듯 끝나게 합니다.
      const progress = Math.min(Math.max(-rect.top / runway, progressFloor), 1)
>>>>>>> master

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
