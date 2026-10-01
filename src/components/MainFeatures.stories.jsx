import MainFeatures from './MainFeatures'

export default {
  title: 'Components/MainFeatures',
  component: MainFeatures,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reverse: { control: 'select', options: ['state', 'revearse', 'mobile'] },
    title: { control: 'text' },
    headline: { control: 'text' },
    desc: { control: 'text' },
  },
  args: { reverse: 'state' },
}

export const Default = {}
export const Reverse = { args: { reverse: 'revearse' } }
export const Mobile = { args: { reverse: 'mobile' } }
