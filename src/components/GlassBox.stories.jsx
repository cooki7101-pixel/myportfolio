import GlassBox from './GlassBox'

export default {
  title: 'Components/GlassBox',
  component: GlassBox,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      // 유리 효과(배경 왜곡)는 배경이 연하면 거의 안 보이므로,
      // 대비가 뚜렷한 진한 배경 + 패턴을 깔아 효과가 잘 드러나게 함
      <div
        style={{
          width: '360px',
          padding: '80px 40px',
          background:
            'repeating-linear-gradient(45deg, #1a1440 0px, #1a1440 24px, #2d1f6e 24px, #2d1f6e 48px), radial-gradient(circle at 30% 20%, #ff5fa2 0%, transparent 45%), radial-gradient(circle at 75% 80%, #21d4c4 0%, transparent 45%)',
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
    // 깊이 (depth) — 유리 카드의 곡률/입체감
    curvature: { control: { type: 'range', min: -10, max: 30, step: 1 } },
    // 왜곡 — 값이 커질수록 카드 뒤 배경이 실제로 더 많이 휘어 보임(배경 굴절 세기)
    distortion: { control: { type: 'range', min: 0, max: 3, step: 0.05 } },
    // 흐릿함 (blur)
    blur: { control: { type: 'range', min: 0, max: 20, step: 0.5 } },
    flexDirection: { control: 'select', options: ['row', 'column'] },
    className: { control: 'text' },
  },
  args: {
    iconSrc: '/assets/glass-box-icon.png',
    lines: ['product', 'DESIGNER'],
    items: null,
    curvature: 0,
    distortion: 1.2,
    blur: 0,
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
