import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

export default {
  title: 'Layout/Header',
  component: Header,
  decorators: [(Story) => <MemoryRouter initialEntries={['/']}><Story /></MemoryRouter>],
}

export const Default = {}
