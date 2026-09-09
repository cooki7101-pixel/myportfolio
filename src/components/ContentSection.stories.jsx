import ContentSection from './ContentSection'
export default { title: 'Components/ContentSection', component: ContentSection, parameters: { layout: 'fullscreen' }, argTypes: { layout: { control: 'select', options: ['vertical', 'horizontal', 'horizontal2'] }, eyebrow: { control: 'text' }, title: { control: 'text' }, description: { control: 'text' }, items: { control: 'object' } }, args: { layout: 'vertical', items: [{ type: 'img', src: '/assets/interview-script.png', label: '이미지에 대한 설명을 입력하세요' }, { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', label: '이미지에 대한 설명을 입력하세요' }] } }
export const Vertical = {}
export const Horizontal = { args: { layout: 'horizontal' } }
export const Horizontal2 = { args: { layout: 'horizontal2' } }
