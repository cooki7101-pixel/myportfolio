import { useEffect } from 'react'
import '../componentsStyle/scroll-fade-images.css'

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
 */
export default function ScrollFadeImages({ selector, excludeSelector }) {
  useEffect(() => {
    const revealThreshold = 0.1
    const container = document.querySelector(selector)
    if (!container) return

    // Development aid: the observer reveals an element when this much of it
    // is visible, so the trigger line sits at the corresponding viewport edge.
    let marker = null
    if (SHOW_SCROLL_FADE_MARKER) {
      marker = document.createElement('div')
      marker.className = 'scroll-fade-marker'
      marker.style.top = `${(1 - revealThreshold) * 100}vh`
      marker.innerHTML = `<span>ScrollFadeImages: ${Math.round(revealThreshold * 100)}% visible</span>`
      document.body.appendChild(marker)
    }

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

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
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
        })
      },
      { threshold: revealThreshold }
    )

    media.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      marker?.remove()
    }
  }, [selector, excludeSelector])

  return null
}
