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
    items: { control: 'object' },
    edgeRefraction: { control: { type: 'range', min: 0, max: 2, step: 0.05 } },
    distortion: { control: { type: 'range', min: 0, max: 2, step: 0.05 } },
    fresnel: { control: { type: 'range', min: 0, max: 2, step: 0.05 } },
    dispersion: { control: { type: 'range', min: 0, max: 2, step: 0.05 } },
    animationSpeed: { control: { type: 'range', min: 0, max: 4, step: 0.1 } },
    waveStrength: { control: { type: 'range', min: 0, max: 3, step: 0.1 } },
    flexDirection: { control: 'select', options: ['row', 'column'] },
    className: { control: 'text' },
  },
  args: {
    iconSrc: '/assets/glass-box-icon.png',
    lines: ['product', 'DESIGNER'],
    items: null,
    edgeRefraction: 0.8,
    distortion: 0.9,
    fresnel: 0.8,
    dispersion: 0.6,
    animationSpeed: 1.8,
    waveStrength: 1.4,
    flexDirection: 'row',
    className: '',
  },
}

export const Default = {}

export const CustomLabel = {
  args: {
    lines: ['creative', 'developer'],
  },
}

export const ItemList = {
  args: {
    flexDirection: 'column',
    items: [
      { iconSrc: '/assets/glass-box-fast-worker.png', text: 'Fast Worker' },
      { iconSrc: '/assets/glass-box-communication.png', text: 'Communication' },
      { iconSrc: '/assets/glass-box-perseverance.png', text: 'Perseverance' },
      { iconSrc: '/assets/glass-box-ai.png', text: 'AI Proficiency' },
    ],
  },
}
