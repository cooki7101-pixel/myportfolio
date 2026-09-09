import '../componentsStyle/hero.css'

const defaultLink = 'https://elevenlabs.io/app/talk-to?agent_id=agent_4501kp8tgvtpfbr89kggzevxk31s&branch_id=agtbrch_8501kp8tgw3zexcrpp0ywnx3cd9c'

export default function Hero({ breakpoint = '기본', title = 'AI 티켓 사기 예방 ‘패싱’', showTitleLink = false, titleLink = defaultLink, mediaType = 'video', mediaSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', children }) {
  const isMobile = breakpoint === 'mobile'
  const isTablet = breakpoint === 'tablet'
  const isTablet2 = breakpoint === 'tablet2'
  return <section className={`hero hero--${isMobile ? 'mobile' : isTablet2 ? 'tablet2' : isTablet ? 'tablet' : 'desktop'}`} data-node-id="348:4017">
    <div className="hero__title-wrap">
      <h1>{title}</h1>
      {showTitleLink && <a href={titleLink} target="_blank" rel="noreferrer">보이스 에이전트 체험해보기 <img src="/assets/title-link-right-arrow.svg" alt="" /></a>}
    </div>
    <div className="hero__media">{children || (mediaType === 'img' ? <img src={mediaSrc} alt="" /> : <video autoPlay muted loop playsInline preload="auto" aria-label="Hero video"><source src={mediaSrc} /></video>)}</div>
  </section>
}
