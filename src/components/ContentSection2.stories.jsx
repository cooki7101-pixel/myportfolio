import ContentSection2 from './ContentSection2'
export default { title: 'Components/ContentSection2', component: ContentSection2, parameters: { layout: 'fullscreen' }, argTypes: { breakpoint: { control: 'select', options: ['desktop', 'mobile'] }, eyebrow: { control: 'text' }, title: { control: 'text' }, description: { control: 'text' }, items: { control: 'object' } }, args: { breakpoint: 'desktop', items: [{ type: 'img', src: '/assets/interview-script.png', label: '이미지 설명' }, { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', label: '비디오 설명' }, { type: 'img', src: '/assets/buyer-mapping.png', label: '세 번째 이미지' }] } }
export const Desktop = {}
export const Mobile = { args: { breakpoint: 'mobile' } }
