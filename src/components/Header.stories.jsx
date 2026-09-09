import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

export default {
  title: 'Layout/Header',
  component: Header,
  argTypes: {
    breakpoint: { control: 'select', options: ['desktop', 'mobile'] },
  },
  args: { breakpoint: 'desktop' },
  decorators: [(Story) => <MemoryRouter initialEntries={['/']}><Story /></MemoryRouter>],
}

export const Default = {}
export const Mobile = { args: { breakpoint: 'mobile' } }
