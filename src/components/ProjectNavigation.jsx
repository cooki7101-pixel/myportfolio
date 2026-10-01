import { Link } from 'react-router-dom'
import { projects } from './ProjectGrid'

export default function ProjectNavigation({ current }) {
  const index = projects.findIndex((project) => project.number === current)
  const next = projects[(index + 1) % projects.length]
  return <div className="project-navigation container"><p className="eyebrow">Next project</p><Link to={next.to}><span>{next.number}</span><strong>{next.title}</strong><span className="arrow">↗</span></Link></div>
}
