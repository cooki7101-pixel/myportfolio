import { useEffect } from 'react'
import '../componentsStyle/scroll-fade-images.css'

// 개발 중에 IntersectionObserver 트리거 라인을 보여주려면 true로 설정.
const SHOW_SCROLL_FADE_MARKER = false

/**
 * 컨테이너의 최상위 자식(섹션) 하나하나를 스크롤로 보이는 순간 제자리로
 * 슬라이드시켜 나타나게 함. 이전에는 컨테이너 안의 개별 <img>/<video>마다
 * 따로 애니메이션을 걸었지만, 이제는 섹션 단위(각 "__section" 래퍼나
 * FeatureKakaoT 같은 최상위 컴포넌트)로 한 번에 나타납니다. work 프로젝트
 * 페이지(Passing / KakaoT / Hyundai)마다 한 번씩 마운트되며, 해당 페이지의
 * "__body" 래퍼로 범위를 한정해서 헤더/히어로/푸터는 영향받지 않음.
 *
 * `excludeSelector`와 일치하는 요소를 포함한 섹션은 애니메이션에서
 * 제외됩니다 — 예를 들어 UT 그룹처럼 자체적인 레이아웃을 가진 섹션.
 */
export default function ScrollFadeImages({ selector, excludeSelector }) {
  useEffect(() => {
    const revealThreshold = 0.1
    const container = document.querySelector(selector)
    if (!container) return

    // 개발 보조용: observer가 이 비율만큼 보였을 때 엘리먼트를 나타나게 하므로,
    // 트리거 라인은 그에 해당하는 뷰포트 위치에 표시됨.
    let marker = null
    if (SHOW_SCROLL_FADE_MARKER) {
      marker = document.createElement('div')
      marker.className = 'scroll-fade-marker'
      marker.style.top = `${(1 - revealThreshold) * 100}vh`
      marker.innerHTML = `<span>ScrollFadeImages: ${Math.round(revealThreshold * 100)}% visible</span>`
      document.body.appendChild(marker)
    }

    const sections = Array.from(container.children).filter(
      (el) => !excludeSelector || !(el.matches(excludeSelector) || el.querySelector(excludeSelector))
    )
    if (sections.length === 0) return

    sections.forEach((el) => el.classList.add('scroll-fade-section'))

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('scroll-fade-section--visible')
          obs.unobserve(entry.target)
        })
      },
      { threshold: revealThreshold }
    )

    sections.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      marker?.remove()
    }
  }, [selector, excludeSelector])

  return null
}
