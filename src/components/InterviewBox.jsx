import '../componentsStyle/interview-box.css'

const defaultItems = [
  { type: 'img', src: '/assets/interview-script.png', label: '인터뷰 스크립트' },
  { type: 'img', src: '/assets/affinity-mapping.png', label: 'AFFINITY MAPPING' },
  { type: 'img', src: '/assets/buyer-mapping.png', label: '구매자 매핑 인사이트' },
  { type: 'img', src: '/assets/seller-mapping.png', label: '판매자 매핑 인사이트' },
]

export default function InterviewBox({ breakpoint = 'desktop', items = defaultItems }) {
  const isMobile = breakpoint === 'mobile'
  return <section className={`interview-box interview-box--${isMobile ? 'mobile' : 'desktop'}`} data-node-id="262:107">
    {items.slice(0, 4).map(({ type = 'img', src, component, label }, index) => <figure className="interview-box__item" key={`${label}-${index}`}>
      <div className="interview-box__media">{component || (type === 'video' ? <video autoPlay muted loop playsInline preload="auto" aria-label={label}><source src={src} /></video> : <img src={src} alt="" />)}</div>
      <figcaption>{label}</figcaption>
    </figure>)}
  </section>
}
