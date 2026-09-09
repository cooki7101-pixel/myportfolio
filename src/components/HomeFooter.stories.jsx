import HomeFooter from './HomeFooter'
export default { title: 'Components/HomeFooter', component: HomeFooter, parameters: { layout: 'fullscreen' }, argTypes: { prop1: { control: 'select', options: ['기본', '베리언트2', '베리언트3'] }, email: { control: 'text' } }, args: { prop1: '기본' } }
export const Default = {}
export const Compact = { args: { prop1: '베리언트2' } }
export const Mobile = { args: { prop1: '베리언트3' } }
