import { MemoryRouter } from 'react-router-dom'
import ProjectCard from './ProjectCard'

export default {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  args: {
    number: '01',
    title: 'Project One',
    category: 'UX Case Study',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80',
    to: '/works/project-01',
  },
}

export const Default = {}
