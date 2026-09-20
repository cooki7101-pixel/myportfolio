import GlassBox from './GlassBox'

export default {
  title: 'Components/GlassBox',
  component: GlassBox,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '360px',
          padding: '80px 40px',
          background: 'linear-gradient(135deg, #dceeff 0%, #f7d9e9 48%, #d7f2e2 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    iconSrc: { control: 'text' },
    lines: { control: 'object' },
    className: { control: 'text' },
  },
  args: {
    iconSrc: '/assets/glass-box-icon.png',
    lines: ['product', 'DESIGNER'],
    className: '',
  },
}

export const Default = {}

export const CustomLabel = {
  args: {
    lines: ['creative', 'developer'],
  },
}
