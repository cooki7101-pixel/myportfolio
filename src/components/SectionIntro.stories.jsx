import SectionIntro from './SectionIntro'

export default {
  title: 'Content/SectionIntro',
  component: SectionIntro,
  args: {
    eyebrow: 'Competitor analysis',
    title: '기존 티켓 거래 서비스는 안전한 거래를 어떻게 만들고 있을까?',
    description:
      '시장 조사를 위해 이미 안전장치를 갖춘 경쟁사도 함께 분석했습니다. 그 중 티켓 전문 거래 플랫폼은 사기 발생 시 100% 환불을 제공하고 있었지만 공연일까지 기다리다가 판매자가 무단 취소하는 문제가 있었습니다. 이를 통해 기존 서비스는 사후 보상에는 대응하고 있지만 거래 과정에서 발생하는 위험을 사전에 줄이는 데에는 한계가 있음을 확인했습니다.',
  },
}

export const Default = {}

export const WithoutEyebrow = {
  args: {
    isShowEyeBrow: false,
  },
}
