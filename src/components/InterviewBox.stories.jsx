import InterviewBox from './InterviewBox'

export default {
  title: 'Components/InterviewBox',
  component: InterviewBox,
  parameters: { layout: 'centered' },
  argTypes: { breakpoint: { control: 'select', options: ['desktop', 'mobile'] } },
  args: {
    breakpoint: 'desktop',
    items: [
      { type: 'img', src: '/assets/interview-script.png', label: '인터뷰 스크립트' },
      { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', label: 'AFFINITY MAPPING' },
      { type: 'img', src: '/assets/buyer-mapping.png', label: '구매자 매핑 인사이트' },
      { type: 'img', src: '/assets/seller-mapping.png', label: '판매자 매핑 인사이트' },
    ],
  },
}

export const Desktop = {}
export const Mobile = { args: { breakpoint: 'mobile' } }
