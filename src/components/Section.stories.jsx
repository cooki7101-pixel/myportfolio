import Section from './Section'

export default {
  title: 'Content/Section',
  component: Section,
  args: {
    eyebrow: '01 / Introduction',
    title: 'A thoughtful section heading.',
    children: <p style={{ maxWidth: '32rem' }}>Use sections to give each part of a case study a clear rhythm and hierarchy.</p>,
  },
}

export const Default = {}
