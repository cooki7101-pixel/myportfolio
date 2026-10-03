import { useId } from 'react'
import '../componentsStyle/glassBox.css'

const GLASS_DEFAULTS = {
  curvature: 0,
  opacity: 0,
  blur: 0,
}

function addToDefault(value, defaultValue, unit = '') {
  const adjustment = Number.parseFloat(value)
  return `${defaultValue + (Number.isNaN(adjustment) ? 0 : adjustment)}${unit}`
}

// 유리처럼 투명하게 비치는 아이콘과 두 줄의 라벨을 담는 카드입니다.
//
// 효과 조절: 배경이 실제로 휘어 보이는 정도는 아래 `distortion` prop
// 하나로 조절합니다 — 이 값이 커질수록 SVG feDisplacementMap의 변위량
// (displacementScale)이 커져서 카드 뒤 배경이 더 많이 뒤틀려 보입니다.
// 흐림 정도는 `blur`, 카드 안쪽 흰색 틴트 농도는 `opacity`, 모서리
// 둥글기는 `curvature`로 따로 조절합니다.
export default function GlassBox({
  iconSrc = '/assets/glass-box-icon.png',
  lines = ['product', 'DESIGNER'],
  items = null,
  width = '100%',
  height,
  curvature = 0,
  opacity = 0,
  blur = 0,
  distortion = 1,
  flexDirection = 'row',
  className = '',
}) {
  const rawId = useId()
  const filterId = `glass-refract-${rawId.replace(/[^a-zA-Z0-9-]/g, '')}`
  // 배경을 실제로 휘어 보이게 만드는 값 — distortion이 커질수록
  // feDisplacementMap의 변위량(scale)이 커져 유리를 통과한 것처럼 뒤가 뒤틀려 보임.
  const displacementScale = Math.max(0, Number(distortion) || 0) * 26

  return (
    <div
      className={`glass-box ${className}`.trim()}
      style={{
        width,
        // 세로 크기 — 지정하지 않으면 내용에 맞춰 자동(auto)
        ...(height ? { height } : null),
        flexDirection,
        // property 값은 기본 유리 효과에 더해지는 보정값으로 적용합니다.
        '--glass-box-curvature': addToDefault(curvature, GLASS_DEFAULTS.curvature, 'px'),
        '--glass-box-opacity': Math.min(Math.max(GLASS_DEFAULTS.opacity + Number(opacity || 0), 0), 1),
        '--glass-box-blur': addToDefault(blur, GLASS_DEFAULTS.blur, 'px'),
        // SVG feDisplacementMap 필터를 backdrop-filter에 함께 걸어서, 블러/채도
        // 보정만이 아니라 뒤에 있는 배경 자체가 유리를 통과한 것처럼 실제로
        // 휘어 보이도록 함(진짜 굴절감의 핵심).
        backdropFilter: `url("#${filterId}") blur(var(--glass-box-blur)) saturate(125%)`,
        WebkitBackdropFilter: `url("#${filterId}") blur(var(--glass-box-blur)) saturate(125%)`,
      }}
      data-node-id="396:4253"
    >
      <svg className="glass-box__filter-defs" aria-hidden="true" focusable="false">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {Array.isArray(items) && items.length > 0 ? (
        <div className="glass-box__items">
          {items.map((item, index) => (
            <div className="glass-box__item" key={`${item.text || 'item'}-${index}`}>
              <div className="glass-box__item-icon" aria-hidden="true">
                <img src={item.iconSrc} alt="" />
              </div>
              <span className="glass-box__item-text">{item.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="glass-box__icon" aria-hidden="true">
            <img src={iconSrc} alt="" />
          </div>
          <div className="glass-box__label">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
