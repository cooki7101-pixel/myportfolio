import Hero from './Hero'

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    breakpoint: { control: 'select', options: ['기본', 'laptop', 'tablet', 'mobile'] },
    title: { control: 'text' },
    showTitleLink: { control: 'boolean' },
    mediaType: { control: 'select', options: ['img', 'video'] },
    mediaSrc: { control: 'text' },
  },
  args: { breakpoint: '기본', showTitleLink: false, mediaType: 'video' },
}
export const Desktop = {}
export const Laptop = { args: { breakpoint: 'laptop' } }
export const Tablet = { args: { breakpoint: 'tablet' } }
export const Mobile = { args: { breakpoint: 'mobile' } }
