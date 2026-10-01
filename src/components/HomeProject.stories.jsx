import HomeProject from './HomeProject'

export default {
  title: 'Components/HomeProject',
  component: HomeProject,
  parameters: { layout: 'centered' },
  argTypes: {
    prop1: { control: 'select', options: ['기본', 'tablet', 'mobile'] },
    title: { control: 'text' },
    description: { control: 'text' },
    tags: { control: 'object' },
    videoType: { control: 'select', options: ['img', 'video'] },
    videoSrc: { control: 'text' },
  },
  args: { prop1: '기본', videoType: 'video' },
}
export const Desktop = {}
export const Tablet = { args: { prop1: 'tablet' } }
export const Mobile = { args: { prop1: 'mobile' } }
