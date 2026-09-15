import Header from '../../components/Header'
import Hero from '../../components/Hero'
import ProjectSummarySection from '../../components/ProjectSummarySection'
import MainFeatures from '../../components/MainFeatures'
import PhaseIntro from '../../components/PhaseIntro'
import ContentSection from '../../components/ContentSection'
import ContentSection2 from '../../components/ContentSection2'
import InterviewBox from '../../components/InterviewBox'
import WireframeGroup from '../../components/WireframeGroup'
import UtGroup from '../../components/UtGroup'
import SectionIntro from '../../components/SectionIntro'
import FooterMore from '../../components/FooterMore'
import '../../componentsStyle/project-kakao-t.css'

// "MORE PROJECTS" footer shows the other two case studies (not this page's own).
const moreProjects = [
  { type: 'video', src: '/assets/home-passing.mp4', label: "AI 티켓 사기 예방 '패싱'" },
  { type: 'video', src: '/assets/home-hyundai.mp4', label: '현대자동차 홈페이지 개선' },
]

export default function ProjectKakaoT() {
  return (
    <article className="project-kakao-t" data-node-id="461:5560" style={{ backgroundColor: '#DEE4F2' }}>
      <Header />

      {/* TODO: swap mediaSrc for the real 카카오T 데모 영상 once it's ready */}
      <Hero
        title={'카카오T with 시니어 맞춤 AI 보이스 에이전트'}
        mediaType="video"
        showTitleLink
      />

      <div className="project-kakao-t__body">
        <ProjectSummarySection
          overview="카카오T는 국내 택시 호출 시장의 대부분을 점유한 거대한 이동 인프라입니다. 하지만 고령층은 택시를 잡기 위해 여전히 길가에 나가 손을 흔듭니다. 저는 노인들이 왜 카카오T에서 호출을 어려워하는지 확인하고, 이들이 호출을 끝까지 완료할 수 있도록 개선하고자 프로젝트를 시작했습니다."
          projectType="2인 프로젝트(70%)"
          duration="8주"
          tools={'Figma,\nFigjam,\nFigmaMake,\nClaude'}
          role={'리서치,\nUIUX디자인,\n프로토타입,\n사용성 테스트'}
        />

        <MainFeatures
          variant="state"
          title="MAIN FEATURES 01"
          headline="시니어 맞춤형 간단 모드"
          desc="홈 화면에 택시 외 기능이 많고 고객센터도 내정보 탭 내 깊숙이 있어 시니어들이 필요한 기능을 찾기 어려웠습니다. 간단 모드를 별도로 제공하여 필요한 기능만 전면에 배치함으로서 기존 사용자의 이용 경험은 유지하면서 시니어의 탐색 부담을 줄였습니다."
        />
        <MainFeatures
          variant="reverse"
          title="MAIN FEATURES 02"
          headline="AI 보이스 에이전트로 화면 조작 부담 감소"
          desc="호출 시 타이핑과 지도 핀 조작의 부담을 줄이기 위해 목적지 입력 등 각 단계의 입력을 말로 대신하고, 어려운 용어도 쉽게 바꿨습니다. 이로써 직접 조작해야 하는 부담을 줄였고, 화면 조작이 필요한 경우에는 화면 보고 호출로 자유롭게 전환할 수 있도록 했습니다."
        />
        <MainFeatures
          variant="state"
          title="MAIN FEATURES 03"
          headline="티켓은 판매 전에 AI가 먼저 검증해요"
          desc="배차 실패 시, 직접 재시도하거나 다른 방법을 찾아야 하는지 판단이 어려워 호출을 포기하는 경우를 위해 자동 재배차 기능과 실패 원인 안내를 제공했습니다. 호출 중 문제 발생 시에는 행동 가이드를 제공하여 문제를 스스로 대응 가능하게 해 호출을 무사히 완료할 수 있도록 했습니다."
        />

        <PhaseIntro
          title="DISCOVER"
          headline="“Why Can’t Seniors Use Kakao T?”"
          desc="카카오T는 이미 전국 어디서나 택시가 잡히는 앱인데 왜 노인들은 택시를 부르지 못할까?"
        />

        {/* DeskResearchGroup */}
        <div className="project-kakao-t__section project-kakao-t__group">
          <ContentSection
            eyebrow="DESK RESEARCH"
            title="시니어는 왜 여전히 길에서 택시를 잡을까?"
            description="카카오T가 있음에도 노인들이 여전히 길에서 택시를 잡는 이유를 알고자 학술논문 13건과 뉴스기사 7건을 분석했습니다. 조사 결과, 시니어가 디지털 기기 사용 전반에서 어려움을 겪고 있다는 점을 확인했고, 이러한 어려움이 택시를 직접 잡는 행동으로 이어질 수 있다고 판단했습니다."
            items={[{}]}
          />
          <ContentSection
            eyebrow="APP REVIEW ANALYSIS"
            title="시니어 사용자들은 정확히 어디서 막힐까?"
            description="시니어가 카카오T를 사용할 때 구체적으로 어떤 어려움을 겪는지 확인하기 위해 사용자와 그들의 가족의 앱 리뷰를 분석했습니다. 그 결과 호출 과정 자체의 문제가 가장 많았으며 문제 발생 후 대응의 어려움 또한 반복적으로 나타났습니다."
            items={[{}]}
          />
        </div>

        {/* CasestudyAnalysisGroup — actual Figma content is the digital-literacy user interviews */}
        <div className="project-kakao-t__section project-kakao-t__group">
          <ContentSection
            layout="split"
            eyebrow="USER INTERVIEWS"
            title="실제로 어느 화면에서 얼마나 오래 멈춰 설까?"
            description="사용자의 디지털 기기 사용 수준에 따라 어려운 지점을 확인하기 위해 10명의 참가자를 대상으로 디지털 리터러시 진단과 4단계 과업을 진행했습니다. 그 결과 수행 시간에는 차이가 있었지만 공통적으로 목적지 설정과 배차 실패·오류 대응에서 가장 크게 막혔습니다. 앞선 리뷰에서 발견한 호출 과정의 어려움이 실제 사용자에게서도 나타나는 것을 확인했습니다."
            items={[]}
          />
          <InterviewBox items={[{}, {}, {}]} />
        </div>

        {/* UserInterviewsGroup — actual Figma content is Affinity Mapping + Competitor analysis */}
        <div className="project-kakao-t__section project-kakao-t__group">
          <ContentSection
            layout="split"
            eyebrow="AFFINITY MAPPING"
            title="호출 단계별 사용자 행동 구조화"
            description="사용자의 말과 행동을 단계별로 모아 호출 과정에서 반복되는 어려움을 유형별로 정리했습니다. 이를 인지·언어·신체·심리적 요인으로 나누어 살펴보며 시니어의 호출을 어렵게 만드는 원인을 구체적으로 파악했습니다."
            items={[{ label: 'AFFINITY MAPPING' }]}
          />

          {/* CompetitorAnalysisGroup */}
          <ContentSection
            eyebrow="COMPETITOR ANALYSIS"
            title="시니어를 위한 기능이 있어도 정말 쉽게 사용할 수 있을까?"
            description="택시 호출 서비스 중 국내에서 이용 가능한 우버의 경우, 시니어 유저가 직접 시니어 모드로 호출해봤음에도 과정이 쉽지 않았고 낮은 인지도와 국내 이용 환경의 한계도 있었습니다. 반면 카카오T는 높은 점유율과 인지도를 갖고 있어 익숙한 서비스를 시니어도 쉽게 사용할 수 있도록 개선한다면 경쟁력을 만들 수 있다고 판단했습니다."
            items={[{}]}
          />
        </div>

        <PhaseIntro
          title="DEFINE"
          headline="“Seniors Feel Anxious and Struggle to Recover from Errors.”"
          desc="시니어 사용자는 일상에 문제없는 디지털 리터러시 수준을 갖추고도 카카오T에서는 불안을 느끼고, 리터러시 수준이 낮을수록 오류가 난 상황에서 스스로 복구하지 못해 서비스 이용을 끝맺지 못한다."
        />

        {/* PersonaGroup — Empathy map */}
        <div className="project-kakao-t__section">
          <ContentSection2
            eyebrow="EMPATHY MAP"
            title="사용자의 감정, 요구 및 행동 이해하기"
            description="고령 사용자의 경험을 더 깊이 이해하기 위해 공감 지도를 작성했습니다. 이를 통해 사용자가 호출 과정에서 느끼는 불안과 망설임, 문제 상황에서 보이는 행동과 필요한 도움을 구체적으로 파악했습니다."
            items={[{ label: '디지털 러터러시 ‘중상’수준 유저 공감 지도' }, { label: '디지털 러터러시 ‘하’수준 유저 공감 지도' }]}
          />
        </div>

        {/* Persona and user journey map */}
        <div className="project-kakao-t__section">
          <ContentSection2
            eyebrow="PERSONA AND USER JOURNEY MAP"
            title="디지털 리터러시 수준에 따른 두 유형의 사용자"
            description="디지털 리터러시 수준에 따라 두 유형의 퍼소나를 정의했습니다. ‘다른 앱은 잘 사용하지만 카카오T에서 어려움을 겪는 사용자’와 ‘앱 사용 자체에 어려움을 느끼는 사용자’로 나누어 시니어의 문제를 단순한 연령이 아닌 디지털 사용 수준과 문제를 해결하는 과정의 차이로 바라봤습니다."
            items={[{ label: '디지털 러터러시 ‘하’ 수준 유저 퍼소나' }, { label: '디지털 러터러시 ‘중상’ 수준 유저 퍼소나' }, {}]}
          />
        </div>

        <PhaseIntro
          title="DEVELOP"
          headline="“How Might We Help Seniors Complete a Taxi Call?”"
          desc="디지털 리터러시 수준과 상관없이 모든 시니어 사용자가 호출을 끝까지 마치게 하려면 어떻게 도와야 할까?"
        />

        {/* BrainStormingGroup */}
        <div className="project-kakao-t__section">
          <ContentSection
            layout="split"
            eyebrow="BRAIN STORMING"
            title="시니어가 호출을 끝맺지 못하는 문제를 해결하기 위한 아이디어 발산"
            description="저희는 택시 호출 과정을 4단계로 나누어 각 단계의 문제를 해결하고, 디지털 리터러시 수준과 관계없이 화면 조작의 부담을 줄여 호출을 끝까지 완료할 방법을 찾기 위해 90개 이상의 아이디어를 도출했습니다."
            items={[{}]}
          />
        </div>

        {/* StoryboardGroup 1 — actual content is MoSCoW prioritization */}
        <div className="project-kakao-t__section">
          <ContentSection
            eyebrow="MoSCoW PRIOTIZATION"
            title="시니어가 혼자서도 무사히 호출을 끝낼 수 있는 기능 설계"
            description="“이 기능이 없어도 사용자가 혼자 빠져나올 수 있는가?”를 기준으로 우선순위를 정했습니다. 고객센터 홈 배치, AI 보이스 에이전트 호출, 앱 안의 간단 모드는 카카오T의 사용 환경을 유지하면서도 시니어가 혼자 쉽게 호출을 끝낼 수 있도록 만드는 기능이기 때문에 Must로 선정했습니다."
            items={[{}]}
          />
        </div>

        {/* StoryboardGroup 2 */}
        <div className="project-kakao-t__section">
          <ContentSection
            eyebrow="STORY BOARD"
            title="시니어의 호출 경험은 어떻게 달라질까?"
            description="실제 시니어가 택시를 호출하는 상황을 바탕으로 문제가 발생하는 순간과 이를 해결하는 과정을 스토리보드로 구체화했습니다. 이를 통해 AI 보이스 에이전트가 각 상황에서 어떻게 사용자를 돕고, 호출을 끝까지 완료하게 하는지 보여주고자 했습니다."
            items={[{}]}
          />
        </div>

        {/* UserflowGroup */}
        <div className="project-kakao-t__section">
          <ContentSection
            eyebrow="USER FLOW"
            title="쉬운 호출을 먼저, 필요한 기능만 간결하게"
            description="화면 조작 부담을 줄이기 위해 말로 호출할 수 있는 AI 보이스 에이전트를 간단 모드의 가장 앞에 배치했습니다. 그 밖에 화면 호출과 고객센터,즐겨찾기만 남기고, 나머지 기능은 더보기로 숨겨 필요한 기능에 바로 접근하도록 IA를 재구성했습니다."
            items={[{}]}
          />
        </div>

        {/* PersonaGroup 2 — actual content is Sketches */}
        <div className="project-kakao-t__section">
          <ContentSection2
            eyebrow="SKETCHES"
            title="빠른 스케치를 통해 아이디어 공유하기"
            description="크레이지 8’을 통해 쉬운 택시 호출과 오류 대응에 초점을 맞춘 아이디어 스케치를 진행했습니다. 이를 통해 팀 내에서 짧은 시간 안에 다양한 아이디어를 비교하고 구체화할 수 있었습니다."
            items={[{ label: '스케치하는 과정' }, { label: '크레이지 8’' }]}
          />
        </div>

        <PhaseIntro
          title="DELIVER"
          headline="“Can Seniors Complete the Call?”"
          desc="이 설계로 시니어 사용자가 실패해도 호출을 끝까지 마칠 수 있을까?"
        />

        {/* PrototypeGroup — wireframe */}
        <WireframeGroup
          eyebrow="WIREFRAME"
          title="호출 흐름을 구체화"
          description="팀원과 실시간으로 소통하며 와이어프레임을 함께 제작하며 아이디어와 화면 구성을 빠르게 공유하고 수정했습니다."
        />

        {/* UserflowGroup — design system */}
        <div className="project-kakao-t__section">
          <ContentSection
            eyebrow="DESIGN SYSTEM"
            title="일관된 화면 시스템 설계"
            description="기존 카카오T의 디자인 정체성은 유지하면서 시니어의 가독성과 인지성을 높일 수 있도록 색상·큰 글씨·굵은 아이콘 등의 기준을 정했습니다. 이를 디자인 시스템으로 체계화해 팀원 모두가 같은 기준으로 작업하고 일관된 UI를 만들 수 있도록 했습니다."
            items={[{}]}
          />
        </div>

        {/* UserflowGroup 2 — prototype */}
        <div className="project-kakao-t__section">
          <ContentSection
            eyebrow="PROTOTYPE"
            title="사용자 경험 검증을 위한 프로토타입 제작"
            description="AI 보이스 호출부터 화면 호출, 목적지 설정, 오류 대응까지의 핵심 흐름을 연결해 실제 사용과 유사하게 프로토타입을 제작했습니다."
            items={[{}]}
          />
        </div>

        {/* UtGroup */}
        <div className="project-kakao-t__section">
          <UtGroup
            eyebrow="USABILITY TEST"
            title="호출 과정의 사용성 평가"
            description="7명의 시니어를 대상으로 과업을 진행하여 호출 성공 여부와 오류 상황에서 스스로 복구할 수 있는지를 확인했습니다. SEQ 평균 98점, SUS 평균 94점으로 사용성은 긍정적이었고 평균 수행 시간도 4분 41초에서 1분 30초로 약 68% 단축되었습니다."
            resultText=""
            docCaption1="UT TASKS SEQ 점수"
            docCaption2="SUS 점수"
          />
        </div>

        {/* BackgroundGroup — iteration */}
        <div className="project-kakao-t__section">
          <SectionIntro
            eyebrow="ITERATION"
            title="실제 사용에서 발견한 작은 불편 개선"
            description="전반적으로 호출 과정은 원활하게 수행했지만 일부 사용자는 작은 아이콘이나 낮은 글자 대비 등 세부적인 시각 요소에서 불편을 느꼈습니다. 따라서 시니어의 시각적 인지를 높이기 위한 세부적인 디자인 수정이 필요하다고 판단했습니다."
          />
        </div>
        <MainFeatures
          variant="state"
          title="FEATURES 01"
          headline="간단 모드 발견성 개선"
          desc="간단 모드 안내 툴팁을 제공했지만 일부 사용자가 이를 인지하지 못해 진입조차 하지 못했습니다. 이에 배경에 딤드 오버레이를 적용하고 간단모드CTA와의 시각적 대비를 높여 간단 모드를 빠르게 찾을 수 있도록 하였습니다."
        />
        <MainFeatures
          variant="reverse"
          title="FEATURES 02"
          headline="아이콘 터치 및 가독성 개선"
          desc="텍스트 크기를 키웠음에도 일부 사용자가 여전히 작게 느끼고, 즐겨찾기 아이콘도 정확히 터치하기 어려워했습니다. 사용자 피드백을 기준으로 텍스트 크기와 레이아웃을 재조정하고 아이콘과 터치 영역을 더 쉽게 인식하고 선택할 수 있도록 개선했습니다."
        />

        {/* TakeawaysBody */}
        <div className="project-kakao-t__takeaways">
          <div className="project-kakao-t__takeaways-heading">
            <p className="project-kakao-t__takeaways-eyebrow">TAKEAWAYS</p>
            <p className="project-kakao-t__takeaways-title">What I Focused</p>
          </div>
          <div className="project-kakao-t__takeaways-list">
            <div className="project-kakao-t__takeaway">
              <div className="project-kakao-t__takeaway-row"><span>01</span><strong>접근성은 크기의 문제가 아니라 회복의 문제다.</strong></div>
              <p>글씨와 버튼을 키우면 될 거라 생각했지만, 알려드리면 잘 쓰시다가도 혼자 실패하는 순간 모든 걸 포기하시는 걸 봤습니다. 접근성은 보이는 크기가 아니라 실패했을 때 돌아올 길이 있느냐의 문제였습니다.</p>
            </div>
            <div className="project-kakao-t__takeaway">
              <div className="project-kakao-t__takeaway-row"><span>02</span><strong>'평균 사용자'를 세우는 순간 가장 필요한 사용자가 배제된다.</strong></div>
              <p>평균적인 시니어를 기준으로 잡았다면 훨씬 만들기 쉬운 안이 나왔을 겁니다. 조작 자체가 어려운 사용자까지 데려가겠다고 타깃을 좁힌 결정이 해법을 화면 개선에서 방식 전환으로 바꿨습니다.</p>
            </div>
            <div className="project-kakao-t__takeaway">
              <div className="project-kakao-t__takeaway-row"><span>03</span><strong>오류 화면은 기능이 아니라 태도를 설계하는 자리다.</strong></div>
              <p>같은 실패라도 "다시 시도하세요"와 "지금 비가 와서 택시가 모두 나가 있어요"는 사용자가 자신을 대하는 방식을 바꿉니다. UX 라이팅이 사용자의 자책을 막을 수 있다는 것을 이 프로젝트에서 배웠습니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frame 229 오버뷰 인디케이터는 검토 후 이어서 추가할 예정입니다. */}

      <FooterMore projects={moreProjects} />
    </article>
  )
}
