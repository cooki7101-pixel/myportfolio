import ProjectHero from './ProjectHero'

export default {
  title: 'Projects/ProjectHero',
  component: ProjectHero,
  args: {
    number: '01',
    category: 'UX Case Study · 2025',
    title: 'Project One',
    description: 'A clear, end-to-end case study layout for showing how a design decision moves from question to outcome.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=80',
  },
}

export const WithImage = {}

export const WithoutImage = {
  args: { image: undefined },
}
