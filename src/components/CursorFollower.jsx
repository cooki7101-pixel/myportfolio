import { useEffect, useRef } from 'react'
import '../componentsStyle/cursor-follower.css'

// A small circle that follows the mouse (mix-blend-mode: difference, so it
// inverts whatever it sits on top of) and grows/inverts further when
// hovering an interactive element (link, button, or anything marked
// data-cursor-hover). Desktop/pointer-fine only — on touch devices there's
// no cursor to follow, so the effect never mounts its listeners.
export default function CursorFollower() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

    // Target = real mouse position, current = where the dot is actually
    // drawn. Every frame nudges current a fraction of the way toward
    // target (lerp), so the dot trails behind instead of snapping to the
    // cursor — the "약간 느리게 따라오는" effect.
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    const EASE = 0.15
    let rafId = null

    const render = () => {
      currentX += (targetX - currentX) * EASE
      currentY += (targetY - currentY) * EASE
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const onOver = (event) => {
      if (event.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        dot.classList.add('cursor-follower--hover')
      }
    }

    const onOut = (event) => {
      if (event.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        dot.classList.remove('cursor-follower--hover')
      }
    }

    const onEnter = () => dot.classList.add('cursor-follower--visible')
    const onLeave = () => dot.classList.remove('cursor-follower--visible')

    document.body.classList.add('cursor-follower-active')
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.body.classList.remove('cursor-follower-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div className="cursor-follower" ref={dotRef} aria-hidden="true" />
}
