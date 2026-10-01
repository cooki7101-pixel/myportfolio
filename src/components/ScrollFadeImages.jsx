import { useEffect } from 'react'
import '../componentsStyle/scroll-fade-images.css'

<<<<<<< HEAD
// Set to true while developing to show the IntersectionObserver trigger line.
const SHOW_SCROLL_FADE_MARKER = true

// Must match the transform transition duration in scroll-fade-images.css —
// used as a fallback in case 'transitionend' doesn't fire (e.g. the element
// was already at its rest transform, so no transition actually runs).
const REVEAL_DURATION_MS = 500

/**
 * Slides every <img> and <video> inside the given container down into
 * place as soon as 20% of it has scrolled into view. Mounted once per work
 * project page (Passing / KakaoT / Hyundai), scoped to that page's own
 * "__body" wrapper so the header/hero/footer are untouched.
 *
 * `excludeSelector` skips any media whose closest matching ancestor
 * matches it — e.g. a specific TO BE screenshot that shouldn't animate.
=======
// 개발 중에 IntersectionObserver 트리거 라인을 보여주려면 true로 설정.
const SHOW_SCROLL_FADE_MARKER = true

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
>>>>>>> master
 */
export default function ScrollFadeImages({ selector, excludeSelector }) {
  useEffect(() => {
    const revealThreshold = 0.1
    const container = document.querySelector(selector)
    if (!container) return

<<<<<<< HEAD
    // Development aid: the observer reveals an element when this much of it
    // is visible, so the trigger line sits at the corresponding viewport edge.
=======
    // 개발 보조용: observer가 이 비율만큼 보였을 때 엘리먼트를 나타나게 하므로,
    // 트리거 라인은 그에 해당하는 뷰포트 위치에 표시됨.
>>>>>>> master
    let marker = null
    if (SHOW_SCROLL_FADE_MARKER) {
      marker = document.createElement('div')
      marker.className = 'scroll-fade-marker'
      marker.style.top = `${(1 - revealThreshold) * 100}vh`
      marker.innerHTML = `<span>ScrollFadeImages: ${Math.round(revealThreshold * 100)}% visible</span>`
      document.body.appendChild(marker)
    }

<<<<<<< HEAD
    const media = Array.from(container.querySelectorAll('img, video')).filter(
      (el) => !excludeSelector || !el.closest(excludeSelector)
    )
    if (media.length === 0) return

    // Walk up a couple of levels (not just the immediate parent) collecting
    // any ancestor that actually clips — some components wrap the real
    // "media box" (overflow: hidden) one level above the img's direct
    // parent (e.g. InterviewBoxKakaoT's item > media > img).
    const getClippingAncestors = (el) => {
      const ancestors = []
      let node = el.parentElement
      for (let depth = 0; node && depth < 3; depth += 1) {
        if (getComputedStyle(node).overflow !== 'visible') ancestors.push(node)
        node = node.parentElement
      }
      return ancestors
    }

    // Captured once per element up front — recomputing this later (after
    // 'scroll-fade-parent' has already forced overflow: visible) would just
    // see our own override and think there's nothing left to restore.
    const clippingAncestorsByEl = new Map()

    media.forEach((el) => {
      el.classList.add('scroll-fade-img')
      const ancestors = getClippingAncestors(el)
      clippingAncestorsByEl.set(el, ancestors)
      // Most of these sit inside a rounded, overflow:hidden "media box" —
      // while it's un-revealed AND while it's animating, temporarily let
      // that box overflow so the image's rise-in starts and plays out
      // truly above/outside the box instead of being clipped the whole
      // way through (and its gray placeholder background peeking through
      // the gap). Only restored once the slide-down transition actually
      // finishes, so the box's normal crop/rounding never cuts the motion
      // itself short.
      ancestors.forEach((ancestor) => ancestor.classList.add('scroll-fade-parent'))
    })
=======
    const sections = Array.from(container.children).filter(
      (el) => !excludeSelector || !(el.matches(excludeSelector) || el.querySelector(excludeSelector))
    )
    if (sections.length === 0) return

    sections.forEach((el) => el.classList.add('scroll-fade-section'))
>>>>>>> master

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
<<<<<<< HEAD
          const el = entry.target
          const clippingAncestors = clippingAncestorsByEl.get(el) || []
          el.classList.add('scroll-fade-img--visible')

          let settled = false
          const restoreClip = () => {
            if (settled) return
            settled = true
            clippingAncestors.forEach((ancestor) => ancestor.classList.remove('scroll-fade-parent'))
          }
          el.addEventListener('transitionend', restoreClip, { once: true })
          setTimeout(restoreClip, REVEAL_DURATION_MS + 50)

          obs.unobserve(el)
=======
          entry.target.classList.add('scroll-fade-section--visible')
          obs.unobserve(entry.target)
>>>>>>> master
        })
      },
      { threshold: revealThreshold }
    )

<<<<<<< HEAD
    media.forEach((el) => observer.observe(el))
=======
    sections.forEach((el) => observer.observe(el))
>>>>>>> master

    return () => {
      observer.disconnect()
      marker?.remove()
    }
  }, [selector, excludeSelector])

  return null
}
