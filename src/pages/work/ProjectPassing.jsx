import Header from '../../components/Header'
import Hero from '../../components/Hero'
import ProjectSummarySection from '../../components/ProjectSummarySection'
import SectionIntro from '../../components/SectionIntro'
import MainFeatures from '../../components/MainFeatures'
import PhaseIntro from '../../components/PhaseIntro'
import ContentSection from '../../components/ContentSection'
import ContentSection2 from '../../components/ContentSection2'
import InterviewBox from '../../components/InterviewBox'
import WireframeGroup from '../../components/WireframeGroup'
import UtGroup from '../../components/UtGroup'
import FooterMore from '../../components/FooterMore'
import '../../componentsStyle/project-passing.css'

// "MORE PROJECTS" footer shows the other two case studies (not this page's own).
const moreProjects = [
  { type: 'video', src: '/assets/home-kakaot.mp4', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' },
  { type: 'video', src: '/assets/home-hyundai.mp4', label: '현대자동차 홈페이지 개선' },
]

export default function ProjectPassing() {
  return (
    <article className="project-passing" data-node-id="291:396" style={{ backgroundColor: '#DEE4F2' }}>
      <Header />

      {/* TODO: swap mediaSrc for the real "패싱" demo video once it's ready */}
      <Hero
        title={'AI 티켓 사기 예방 ‘패싱’'}
        mediaType="video"
      />

      <div className="project-passing__body">
        <ProjectSummarySection />

        <div className="project-passing__section">
          <SectionIntro
            eyebrow="BACKGROUND"
            title="티켓 사기는 다른 P2P 거래와 무엇이 다를까?"
            description="일반적인 P2P 거래 플랫폼은 안전결제로 사기를 어느 정도 방지하는데 왜 티켓은 여전히 X(트위터)에서 많이 거래되고 사기도 많다고 하는지 의문이 들었습니다. 살펴보니 티켓은 환불만으로는 되돌릴 수 없는 공연 경험과 거래 방식에 따른 다양한 사기 위험이 있었습니다. 이를 통해 일반적인 P2P 안전장치와 다른 티켓 특화 사전 예방 방식이 필요하다고 판단했습니다."
          />
        </div>

        <MainFeatures
          variant="state"
          title="MAIN FEATURES 01"
          headline="티켓은 판매 전에 AI가 먼저 검증해요"
          desc="위조 티켓과 동일 티켓의 중복 등록으로 사기 위험이 발생하는 문제를 해결하기 위해 판매자가 예매 내역을 등록하면 AI가 위조·중복 여부를 자동 검증하도록 했습니다. 검증을 통과한 티켓만 판매할 수 있도록 해 거래 전 사기를 사전에 차단했습니다."
        />
        <MainFeatures
          variant="reverse"
          title="MAIN FEATURES 02"
          headline="X(트위터)를 떠나지 않아도 안전하게 거래할 수 있어요"
          desc="안전한 거래를 위해 별도 앱으로 이동해야 하는 불편을 해결하고자 X(트위터)에서 바로 이용할 수 있는 안전결제 플랫폼을 설계했습니다. 게시글에 안전결제 링크를 연결해 X를 벗어나지 않고 익숙한 SNS 환경에서 거래할 수 있도록 했습니다."
        />
        <MainFeatures
          variant="state"
          title="MAIN FEATURES 03"
          headline="돈은 티켓을 받을 때까지 안전하게 보관돼요"
          desc="공연 직전까지 티켓을 받지 못하거나 판매자가 잠적하는 문제를 해결하기 위해 티켓 전송 기한과 구매 확정 기반의 안전결제를 적용했습니다. 결제 금액을 중간에서 보관하고, 구매자가 티켓을 확인한 뒤 구매 확정해야 판매자에게 정산되도록 해 미수령 거래를 사전에 방지했습니다."
        />

        <PhaseIntro />

        {/* DeskResearchGroup */}
        <div className="project-passing__section project-passing__group">
          <ContentSection
            eyebrow="DESK RESEARCH"
            title="왜 티켓인가?"
            description={`먼저 어떤 품목의 사기 피해가 가장 큰지 확인하고자 뉴스 17건과 학술 연구 6건을 분석했습니다. 그 결과 티켓·상품권이 사기 피해 1위였고, 20대 피해가 가장 많았으며 10대 피해도 늘고 있었습니다. 젊은 층도 쉽게 피해를 입을 만큼 사기 수법이 교묘해지고 있다는 점에서 반드시 풀어야 할 문제라고 판단했습니다.\n\n티켓류 중 상품권과 이용권은 사후 환불로 해결이 가능해 제외했습니다. 환불로도 공연이 돌아오지 않는 점에서 티켓만 최종 대상으로 남겼습니다.`}
            items={[{}]}
          />
          <ContentSection
            showEyebrow={false}
            title="왜 X(트위터)인가?"
            description="이후 구조적으로 안전장치가 부족함에도 X(트위터)에서 거래하는 이유를 분석했습니다. 더치트 사기 신고 데이터와 온라인 거래 사례 및 미디어 피해 사례를 분석해 가짜 예매 내역 인증, 조급한 입금 유도 등 반복되는 사기 패턴을 확인했습니다. 또한 실시간 매물과 팬덤 중심의 높은 접근성이 X(트위터)를 이용하는 주요 요인임을 도출했습니다."
            items={[{ label: 'X(트위터)에서 일어나는 P2P 거래 실제 게시글' }, {}]}
          />
        </div>

        {/* CasestudyAnalysisGroup */}
        <div className="project-passing__section">
          <ContentSection
            eyebrow="CASESTUDY ANALYSIS"
            title="위험한데도 왜 계속 X(트위터)를 쓸까?"
            description="시장 조사를 위해 안전장치를 갖춘 경쟁사의 거래 구조를 비교 분석했습니다. 티켓 전문 플랫폼은 사기 발생 시 환불을 제공하지만 판매자의 무단 취소 등 거래 과정의 위험은 사전에 차단하기 어려운 한계를 확인했습니다."
            items={[{}]}
          />
        </div>

        {/* CompetitorAnalysisGroup */}
        <div className="project-passing__section">
          <ContentSection
            eyebrow="COMPETITOR ANALYSIS"
            title="기존 티켓 거래 서비스는 안전한 거래를 어떻게 만들고 있을까?"
            description="시장 조사를 위해 이미 안전장치를 갖춘 경쟁사도 함께 분석했습니다. 그 중 티켓 전문 거래 플랫폼은 사기 발생 시 100% 환불을 제공하고 있었지만 공연일까지 기다리다가 판매자가 무단 취소하는 문제가 있었습니다. 이를 통해 기존 서비스는 사후 보상에는 대응하고 있지만 거래 과정에서 발생하는 위험을 사전에 줄이는 데에는 한계가 있음을 확인했습니다."
            items={[{}]}
          />
        </div>

        {/* UserInterviewsGroup */}
        <div className="project-passing__section project-passing__group">
          <ContentSection
            layout="split"
            eyebrow="USER INTERVIEWS"
            title="검증한 ‘X(트위터)를 떠나지 못하는 이유’"
            description="앞선 리서치를 바탕으로 팬 1명, 일반 관람객 2명을 대상으로 인터뷰를 진행했습니다. 사용자들은 예상대로 X(트위터)의 위험성을 알고 있었지만 티켓을 빠르게 찾을 수 있다는 이유로 계속 이용하기도 했습니다. 새로운 문제를 발견하기보다는 앞서 확인한 ‘위험을 알면서도 떠나지 못하는 이유’를 검증하는 과정이었습니다."
            items={[{ label: "'참여자 A'와 인터뷰 과정" }]}
          />
          <InterviewBox />
        </div>

        <PhaseIntro
          title="DEFINE"
          headline="“P2P trust gaps lead to fraud, while current solutions focus on compensation.”"
          desc="P2P 거래 특성상 개인 간 신뢰에 의존해 사기 위험이 높으며 기존 서비스는 예방이 아닌 피해 이후 보상에 집중되어 있다."
        />

        {/* PersonaGroup */}
        <div className="project-passing__section">
          <ContentSection2
            eyebrow="PERSONA"
            title="서로 다른 두 사용자의 거래 니즈 분석"
            description="인터뷰를 통해 도출한 인사이트를 바탕으로 구매자와 판매자 퍼소나를 제작했습니다. 구매자는 사기 위험에 대한 불안과 원하는 티켓을 빠르게 구해야 하는 부담이 있었고, 판매자는 티켓 등록 과정과 반복적인 채팅의 번거로움을 경험하고 있었습니다."
            items={[{ label: '구매자 퍼소나' }, { label: '판매자 퍼소나' }, {}]}
          />
        </div>

        <PhaseIntro
          title="IDEATE"
          headline="“How might we make ticket trading safe and easy on X(Twitter)?”"
          desc="어떻게 하면 익숙한 X(트위터) 환경은 유지하면서 구매자는 안전하고 판매자는 간편하게 티켓을 거래할 수 있을까?"
        />

        {/* BrainStormingGroup */}
        <div className="project-passing__section">
          <ContentSection
            layout="split"
            eyebrow="BRAIN STORMING"
            title="X(트위터)의 편리함은 유지하면서 거래 위험을 예방하는 31가지 AI 기반 아이디어"
            description="사기 예방부터 거래 편의성 개선까지 31가지의 다양한 아이디어를 도출했습니다. 이후 사용자가 익숙한 거래 환경은 유지하면서 별도의 노력을 들이지 않아도 거래 과정 안에서 자연스럽게 안전성을 확보할 수 있도록 사전 검증과 신뢰 형성에 집중하는 방향으로 아이디어를 발전시켰습니다."
            items={[{}]}
          />
        </div>

        {/* MoscowGroup */}
        <div className="project-passing__section">
          <ContentSection2
            eyebrow="MoSCoW PRIORITIZATION"
            title="사기 예방을 위한 핵심 기능 우선순위 선정"
            description="도출한 아이디어는 MoSCoW Matrix를 활용해 우선순위를 정리했습니다. 특히 Must Have는 ‘해당 기능이 없을 경우 사기 예방이라는 서비스의 핵심 가치가 무너지는가’와 ‘안전한 거래 환경 구축에 필수적인가’를 기준으로 선정했습니다."
            items={[{ label: '구매자 모스코우' }, { label: '판매자 모스코우' }]}
          />
        </div>

        {/* StoryboardGroup */}
        <div className="project-passing__section">
          <ContentSection
            eyebrow="STORY BOARD"
            title="불안한 티켓 거래를 안전한 경험으로 바꾸다"
            description="사기를 걱정하면서도 원하는 티켓을 위해 X(트위터)를 사용할 수밖에 없던 사용자가 AI 검증과 안전장치를 통해 안심하고 X(트위터)에서 거래하는 과정을 스토리보드로 제작했습니다."
            items={[{}]}
          />
        </div>

        {/* UserflowGroup */}
        <div className="project-passing__section project-passing__group">
          <ContentSection2
            eyebrow="USER FLOW"
            title="AI 기반 티켓 검증 프로세스 설계"
            description="판매 전 단계에 예매 내역 이미지 기반 AI 검증을 적용해 구매자의 진위 확인 부담을 줄였습니다. 또한 티켓 유형별 판매 절차를 구분해 판매자는 쉽게 등록하고, 구매자는 검증된 정보를 바탕으로 거래할 수 있도록 설계했습니다."
            items={[{ label: '구매자 FLOW' }, { label: '판매자 FLOW' }]}
          />

          {/* Feature Definition */}
          <div className="project-passing__feature-definition">
            <p>도출한 기능을 구현 단계에서 명확하게 전달하고 서비스 방향성을 일관되게 유지하기 위한 기능 정의 문서화를 진행했습니다.</p>
            <div className="project-passing__feature-definition-image" />
          </div>
        </div>

        <WireframeGroup />

        <PhaseIntro
          title="PROTOTYPE"
          headline="“Do Buyers Feel Safe and Can Sellers Trade Easily?”"
          desc="구매자는 실제로 안전하다고 느끼고, 판매자는 쉽게 거래할 수 있는가?"
        />

        {/* PrototypeGroup */}
        <div className="project-passing__section">
          <ContentSection
            eyebrow="PROTOTYPE"
            title="사용자 경험 검증을 위한 프로토타입 제작"
            description="사용자 경험을 시뮬레이션하고 디자인 솔루션을 검증하기 위해 프로토타입을 제작했습니다."
            items={[{}]}
          />
        </div>

        {/* UtGroup */}
        <div className="project-passing__section">
          <UtGroup />
        </div>

        {/* TakeawaysBody */}
        <div className="project-passing__takeaways">
          <div className="project-passing__takeaways-heading">
            <p className="project-passing__takeaways-eyebrow">TAKEAWAYS</p>
            <p className="project-passing__takeaways-title">What I Focused</p>
          </div>
          <div className="project-passing__takeaways-list">
            <div className="project-passing__takeaway">
              <div className="project-passing__takeaway-row"><span>01</span><strong>요청 뒤의 진짜 문제 찾기</strong></div>
              <p>사용자가 말한 요청을 그대로 만들지 않고, 그 요청이 가리키는 진짜 불안을 찾아내는 법을 배웠습니다.</p>
            </div>
            <div className="project-passing__takeaway">
              <div className="project-passing__takeaway-row"><span>02</span><strong>안전과 이탈 없음 사이의 균형</strong></div>
              <p>안전장치를 더하는 것과 사용자를 지치게 하지 않는 것 사이에서 균형을 잡는 게 진짜 설계라는 걸 배웠습니다.</p>
            </div>
            <div className="project-passing__takeaway">
              <div className="project-passing__takeaway-row"><span>03</span><strong>기술적 한계 안에서 설계하기</strong></div>
              <p>예매처 API가 공개되지 않아 할 수 없는 일이 많았습니다. 좋은 디자인은 그 한계를 인정하고 그 안에서 최선의 답을 찾는 것이라는 걸 배웠습니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frame 229 오버뷰 인디케이터는 검토 후 이어서 추가할 예정입니다. */}

      <FooterMore projects={moreProjects} />
    </article>
  )
}
