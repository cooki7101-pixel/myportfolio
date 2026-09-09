import '../componentsStyle/project-summary-section.css'

function MetaItem({ label, children }) {
  return <div className="project-summary__meta"><p className="project-summary__label">{label}</p><div className="project-summary__value">{children}</div></div>
}

export default function ProjectSummarySection({
  duration = '8주',
  overview = '티켓 사기는 환불만으로는 지나간 공연 경험을 되돌릴 수 없어 사전 예방이 중요합니다. 이에 X(트위터)의 익숙한 거래 환경은 유지하면서 AI 이미지 검증을 통해 거래 전 사기를 예방하는 서비스를 설계했습니다.',
  projectType = '1인 프로젝트',
  property1 = 'Desktop',
  role = '리서치,\nUIUX디자인,\n프로토타입,\n사용성 테스트',
  tools = 'Figma,\nFigjam,\nFigmaMake,\nClaude,\nLovable',
}) {
  const isTablet = property1 === 'Tablet'
  return (
    <section className={`project-summary project-summary--${isTablet ? 'tablet' : 'desktop'}`} data-node-id="291:1704">
      <div className="project-summary__overview">
        <p className="project-summary__label">OVERVIEW</p>
        <p className="project-summary__overview-text">{overview}</p>
      </div>
      <MetaItem label="PROJECT TYPE">{projectType}</MetaItem>
      <MetaItem label="DURATION">{duration}</MetaItem>
      <MetaItem label="TOOLS"><p>{tools}</p></MetaItem>
      <MetaItem label="ROLE"><p>{role}</p></MetaItem>
    </section>
  )
}
