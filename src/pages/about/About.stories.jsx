import { MemoryRouter } from 'react-router-dom'
import About from './About'

export default {
  title: 'Pages/About',
  component: About,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <MemoryRouter initialEntries={['/about']}><Story /></MemoryRouter>],
}

export const Default = {}
