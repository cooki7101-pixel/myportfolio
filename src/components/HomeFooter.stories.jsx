import { MemoryRouter } from 'react-router-dom'
import HomeFooter from './HomeFooter'

export default {
  title: 'Layout/Footer',
  component: HomeFooter,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    breakpoint: { control: 'select', options: ['desktop', 'tablet', 'mobile'] },
    email: { control: 'text' },
    linkedinUrl: { control: 'text' },
    resumeUrl: { control: 'text' },
  },
  args: { breakpoint: 'desktop' },
  decorators: [(Story) => <MemoryRouter initialEntries={['/']}><Story /></MemoryRouter>],
}

export const Default = {}
export const Tablet = { args: { breakpoint: 'tablet' } }
export const Mobile = { args: { breakpoint: 'mobile' } }
