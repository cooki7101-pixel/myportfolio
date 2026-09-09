import '../componentsStyle/main-features.css'

const exampleVideo = <video autoPlay muted loop playsInline preload="auto" aria-label="Example feature video"><source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" /></video>

function FeatureIntro({ title, headline, desc }) {
  return <div className="main-features__intro"><p className="main-features__eyebrow">{title}</p><h3>{headline}</h3><p className="main-features__description">{desc}</p></div>
}

function VideoPlaceholder({ children, mobile }) {
  return <div className={`main-features__video ${mobile ? 'main-features__video--mobile' : ''}`}>{children}</div>
}

export default function MainFeatures({
  reverse = 'state',
  video = exampleVideo,
  title = 'MAIN FEATURES 01',
  headline = '티켓은 판매 전에 AI가 먼저 검증해요',
  desc = '위조 티켓과 동일 티켓의 중복 등록으로 사기 위험이 발생하는 문제를 해결하기 위해 판매자가 예매 내역을 등록하면 AI가 위조·중복 여부를 자동 검증하도록 했습니다. 검증을 통과한 티켓만 판매할 수 있도록 해 거래 전 사기를 사전에 차단했습니다.',
}) {
  const isMobile = reverse === 'mobile'
  const isReverse = reverse === 'revearse'
  const intro = <FeatureIntro title={title} headline={headline} desc={desc} />
  return <section className={`main-features main-features--${isMobile ? 'mobile' : isReverse ? 'reverse' : 'state'}`} data-node-id="262:107">
    {!isReverse && intro}
    {!isMobile && <VideoPlaceholder>{video}</VideoPlaceholder>}
    {isReverse && intro}
    {isMobile && <VideoPlaceholder mobile>{video}</VideoPlaceholder>}
  </section>
}
