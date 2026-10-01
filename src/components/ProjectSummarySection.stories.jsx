import ProjectSummarySection from './ProjectSummarySection'

export default {
  title: 'Components/ProjectSummarySection',
  component: ProjectSummarySection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    overview: { control: 'text' },
    projectType: { control: 'text' },
    duration: { control: 'text' },
    tools: { control: 'text' },
    role: { control: 'text' },
    property1: { control: 'select', options: ['Desktop', 'Tablet'] },
  },
  args: { property1: 'Desktop' },
}

export const Desktop = {}
export const Tablet = { args: { property1: 'Tablet' } }
