import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

  // 폰트(Neue Machina)가 준비되기 전에는 숫자를 아예 그리지 않고(파란 배경만),
  // 준비되면 숫자가 뜨면서 0%부터 카운트를 시작합니다. 폰트가 끝내 안 와도 1.5초 뒤엔 시작합니다.
  const [fontReady, setFontReady] = useState(false)

  // index.html의 임시 파란 화면은 React 로딩 화면(같은 배경색)이 그려지는 즉시 제거
  useLayoutEffect(() => {
    document.getElementById('boot-loading')?.remove()
  }, [])

  useEffect(() => {
    let done = false
    const ready = () => {
      if (!done) {
        done = true
        setFontReady(true)
      }
    }
    const timer = setTimeout(ready, 1500)
    if (document.fonts?.load) {
      document.fonts
        .load('80px "Neue Machina"', '0123456789%')
        .then(ready, ready)
    } else {
      ready()
    }
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!fontReady) return
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

    // 탭이 백그라운드 상태라 rAF가 throttle되어 위 tick이 거의 안 불려도,
    // 실제 시간(setTimeout) 기준으로 COUNT_DURATION + 여유시간이 지나면
    // 강제로 로딩을 끝냅니다 — 이러면 백그라운드 탭에서도 hero 애니메이션이
    // 영원히 멈추는 일이 없습니다.
    const fallbackId = setTimeout(() => {
      setPercent(100)
      setFadingOut(true)
    }, COUNT_DURATION + 800)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(fallbackId)
    }
  }, [fontReady])

  useEffect(() => {
    if (!fadingOut) return
    const timeoutId = setTimeout(() => onFinish?.(), FADE_DURATION)
    return () => clearTimeout(timeoutId)
  }, [fadingOut, onFinish])

  return (
    <div className={`loading-screen${fadingOut ? ' loading-screen--fade-out' : ''}`} aria-hidden={fadingOut}>
      <p className="loading-screen__percent" style={{ visibility: fontReady ? 'visible' : 'hidden' }}>{percent}%</p>
    </div>
  )
}
