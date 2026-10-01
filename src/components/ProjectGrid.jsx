import ProjectCard from './ProjectCard'

export const projects = [
  { number: '01', title: 'Project One', category: 'UX Case Study', year: '2025', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80', to: '/works/project-01' },
  { number: '02', title: 'Project Two', category: 'Editorial Interface', year: '2024', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80', to: '/works/project-02' },
  { number: '03', title: 'Project Three', category: 'Visual Direction', year: '2024', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80', to: '/works/project-03' },
]

export default function ProjectGrid() {
  return <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} {...project} />)}</div>
}
