import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/reset.css'
import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'

// 화면 폭 비율을 단위 없는 숫자로 계산해 CSS 변수로 넣습니다(구형 Safari는 calc(길이/길이) 미지원).
function updateViewportScale() {
  const w = window.innerWidth
  const root = document.documentElement.style
  root.setProperty('--k19', String(Math.min(w, 1920) / 1920))
  root.setProperty('--k11', String(Math.min(w, 1100) / 1100))
  root.setProperty('--m487', String(w / 487))
  root.setProperty('--u487', String(487 / w))
}
updateViewportScale()
window.addEventListener('resize', updateViewportScale)
window.addEventListener('orientationchange', updateViewportScale)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
