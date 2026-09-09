import Hero from '../../components/Hero'
import ProjectSummarySection from '../../components/ProjectSummarySection'
import SectionIntro from '../../components/SectionIntro'
import MainFeatures from '../../components/MainFeatures'

const passingHeroImage = '/assets/buyer-mapping.png'

export default function ProjectPassing() {
  return <article className="project-passing" style={{ backgroundColor: '#DEE4F2' }}>
    <Hero title="AI 티켓 사기 예방 ‘패싱’" mediaType="img" mediaSrc={passingHeroImage} />
    <div className="container">
      <ProjectSummarySection />
      <section className="project-passing__overview" style={{ padding: '40px 0' }}>
        <SectionIntro
          eyebrow="BACKGROUND"
          title="티켓 사기는 다른 P2P 거래와 무엇이 다를까?"
          description="일반적인 P2P 거래 플랫폼은 안전결제로 사기를 어느 정도 방지하는데 왜 티켓은 여전히 X(트위터)에서 많이 거래되고 사기도 많다고 하는지 의문이 들었습니다. 살펴보니 티켓은 환불만으로는 되돌릴 수 없는 공연 경험과 거래 방식에 따른 다양한 사기 위험이 있었습니다. 이를 통해 일반적인 P2P 안전장치와 다른 티켓 특화 사전 예방 방식이 필요하다고 판단했습니다."
        />
      </section>
      <section className="project-passing__features">
        <MainFeatures
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
          title="MAIN FEATURES 03"
          headline="돈은 티켓을 받을 때까지 안전하게 보관돼요"
          desc="공연 직전까지 티켓을 받지 못하거나 판매자가 잠적하는 문제를 해결하기 위해 티켓 전송 기한과 구매 확정 기반의 안전결제를 적용했습니다. 결제 금액을 중간에서 보관하고, 구매자가 티켓을 확인한 뒤 구매 확정해야 판매자에게 정산되도록 해 미수령 거래를 사전에 방지했습니다."
        />
      </section>
    </div>
  </article>
}
