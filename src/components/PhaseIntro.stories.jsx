import PhaseIntro from './PhaseIntro'

export default {
  title: 'Components/PhaseIntro',
  component: PhaseIntro,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    headline: { control: 'text' },
    desc: { control: 'text' },
    breakpoint: { control: 'select', options: ['desktop', 'tablet', 'mobile'] },
  },
  args: {
    title: 'EMPATHIZE',
    headline: '“Why do users keep trading Tickets on x(Twitter) despite the risk of scams?”',
    desc: "왜 사용자는 '사기 위험'을 알면서도 X(트위터)에서의 티켓 거래를 멈추지 못할까?",
    breakpoint: 'desktop',
  },
}

export const Desktop = {}
export const Tablet = { args: { breakpoint: 'tablet' } }
export const Mobile = { args: { breakpoint: 'mobile' } }
