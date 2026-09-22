import Header from '../../components/Header'
import Hero from '../../components/Hero'
import ProjectSummarySection from '../../components/ProjectSummarySection'
import ComparisonHyundai from '../../components/ComparisonHyundai'
import ResponsiveHyundai from '../../components/ResponsiveHyundai'
import ContentSection from '../../components/ContentSection'
import PhaseIntro from '../../components/PhaseIntro'
import FooterMore from '../../components/FooterMore'
import ScrollFadeImages from '../../components/ScrollFadeImages'
import '../../componentsStyle/project-hyundai.css'

// "MORE PROJECTS" footer shows the other two case studies (not this page's own).
const moreProjects = [
  { type: 'video', src: '/assets/moreproject/passing_MORE%20PROJECT-video..mp4', label: "AI 티켓 사기 예방 '패싱'", to: '/works/project-passing' },
  { type: 'video', src: '/assets/moreproject/kakaot-MORE%20PROJECT-video.mp4', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트', to: '/works/kakao-t' },
]

export default function ProjectHyundai() {
  return (
    <article className="project-hyundai" data-node-id="483:4723" style={{ backgroundColor: '#DEE4F2' }}>
      <Header />

      <Hero
        title={'현대 자동차 홈페이지 개선'}
        mediaType="video"
        mediaSrc="/assets/hero-hyundai.mp4"
      />

      <div className="project-hyundai__body">
        <ProjectSummarySection
          overview="현대자동차 웹사이트의 랜딩페이지와 견적 페이지를 반응형 관점에서 재검토했습니다. 섹션마다 다른 그리드, 흐름이 끊기는 정보 구조, 데스크탑 기준으로만 설계된 레이아웃이 모바일에서 그대로 무너지는 문제를 발견했고, AIDA 흐름에 맞춰 각 섹션의 역할을 재정의해 디자인했습니다."
          projectType="1인 프로젝트"
          duration="4주"
          tools={'Figma, \nFigmaMake'}
          role={'UIUX디자인,\n프로토타입'}
        />

        {/* ComparisonSummary: Comparison-Hyundai + ASISTOBE-section */}
        <ComparisonHyundai
          title="메인 페이지"
          asIsImage="/assets/hyundai/img-mainASIS.svg"
          toBeImage="/assets/hyundai/img-mainTOBE.svg"
          toBeLogo="/assets/hyundai/feature-tobe.svg"
        />
        <ComparisonHyundai
          title="견적내기 페이지"
          asIsImage="/assets/hyundai/img-subASIS.svg"
          toBeImage="/assets/hyundai/img-subTOBE.svg"
          toBeLogo="/assets/hyundai/feature-tobe.svg"
        />

        {/* CURRENT PROBLEM Section — MainpageGroup (with eyebrow) + SubPageGroup (no eyebrow) */}
        <div className="project-hyundai__section">
          <ContentSection
            eyebrow="CURRENT PROBLEM"
            title="메인 페이지"
            description="기존 현대자동차 랜딩페이지는 섹션마다 다른 그리드와 카드 규격을 사용해 스캔 피로도를 높이고, 정지 이미지 중심의 히어로 구성으로 브랜드 몰입감과 구매 전환 유도력을 동시에 제한했습니다."
            items={[{ src: '/assets/hyundai/img-currentMain.svg' }]}
          />
        </div>
        <div className="project-hyundai__section">
          <ContentSection
            showEyebrow={false}
            title="견적내기 페이지"
            description="옵션 정보가 분산되어 선택 결과와 최종 견적의 변화를 한눈에 파악하기 어려웠습니다. 또한 모델 비교를 위해 페이지를 반복 이동해야 했으며 섹션별 레이아웃이 일관되지 않아 탐색 피로도가 높았습니다."
            items={[{ src: '/assets/hyundai/img-currentSub.svg' }]}
          />
        </div>

        {/* SOLUTION-section */}
        <PhaseIntro
          title="CORE CHALLENGE"
          headline="“How might we balance layout consistency with brand trust and purchase appeal?”"
          desc="레이아웃 일관성을 지키면서 차량의 매력과 브랜드 신뢰를 효과적으로 전달해 구매 결정까지 연결하려면 어떻게 해야 할까?"
        />

        <div className="project-hyundai__section">
          <ContentSection
            eyebrow="SOLUTION"
            title="메인 페이지"
            description="기존 현대자동차 랜딩페이지는 섹션마다 다른 그리드와 카드 규격을 사용해 스캔 피로도를 높이고, 정지 이미지 중심의 히어로 구성으로 브랜드 몰입감과 구매 전환 유도력을 동시에 제한했습니다."
            items={[{ src: '/assets/hyundai/img-solutionMain.svg' }]}
          />
        </div>
        <div className="project-hyundai__section">
          <ContentSection
            showEyebrow={false}
            title="견적내기 페이지"
            description="사람이 좌→우, 위→아래로 읽는 흐름에 맞춰 옵션 선택 시 이미지와 가격이 같은 화면 안에서 즉시 반영되도록 재구성했습니다."
            items={[{ src: '/assets/hyundai/img-solutionSub.svg' }]}
          />
        </div>

        {/* Responsive-section: Responsive-Mainp-section + Responsive-subp-section */}
        <div className="project-hyundai__section">
          <ResponsiveHyundai
            eyebrow="RESPONSIVE WEB DESIGN"
            title="메인 페이지"
            desktopImage="/assets/hyundai/img-responsiveMain1.svg"
            tabletImage="/assets/hyundai/img-responsiveMain2.svg"
            mobileImage="/assets/hyundai/img-responsiveMain3.svg"
          />
        </div>
        <div className="project-hyundai__section">
          <ResponsiveHyundai
            title="견적내기 페이지"
            desktopImage="/assets/hyundai/img-responsiveSub1.svg"
            tabletImage="/assets/hyundai/img-responsiveSub2.svg"
            mobileImage="/assets/hyundai/img-responsiveSub3.svg"
          />
        </div>
      </div>

      <FooterMore projects={moreProjects} />
      <ScrollFadeImages selector=".project-hyundai__body" />
    </article>
  )
}
