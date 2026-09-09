import FooterMore from './FooterMore'

export default { title: 'Components/FooterMore', component: FooterMore, parameters: { layout: 'fullscreen' }, argTypes: { breakpoint: { control: 'select', options: ['desktop', 'tablet'] }, projects: { control: 'object' }, copyright: { control: 'text' } }, args: { breakpoint: 'desktop', projects: [{ type: 'img', src: '/assets/buyer-mapping.png', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' }, { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', label: '카카오T with 시니어 맞춤 AI 보이스 에이전트' }] } }
export const Desktop = {}
export const Tablet = { args: { breakpoint: 'tablet' } }
