import { Link } from 'react-router-dom'

export default function ProjectCard({ title, category, year, image, to, number }) {
  return <Link className="project-card" to={to}><div className="project-image" style={{ backgroundImage: `url(${image})` }}><span>{number}</span></div><div className="project-meta"><div><h3>{title}</h3><p>{category}</p></div><span>{year}</span></div></Link>
}
