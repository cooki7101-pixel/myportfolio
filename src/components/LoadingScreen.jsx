import { useEffect, useRef, useState } from 'react'
import '../componentsStyle/loading-screen.css'

// Full-screen loading overlay shown once on first load — counts 0% to 100%
// (Figma node 573:8409, "ING") then fades out and unmounts. `onFinish` is
// called after the fade-out transition completes.
const COUNT_DURATION = 1400
const FADE_DURATION = 500

export default function LoadingScreen({ onFinish }) {
  const [percent, setPercent] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)
  const startRef = useRef(null)

  useEffect(() => {
    let rafId = null

    const tick = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / COUNT_DURATION, 1)
      // Ease-out so the count settles into 100% rather than landing abruptly.
      const eased = 1 - Math.pow(1 - progress, 3)
      setPercent(Math.round(eased * 100))

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setFadingOut(true)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (!fadingOut) return
    const timeoutId = setTimeout(() => onFinish?.(), FADE_DURATION)
    return () => clearTimeout(timeoutId)
  }, [fadingOut, onFinish])

  return (
    <div className={`loading-screen${fadingOut ? ' loading-screen--fade-out' : ''}`} aria-hidden={fadingOut}>
      <p className="loading-screen__percent">{percent}%</p>
    </div>
  )
}
