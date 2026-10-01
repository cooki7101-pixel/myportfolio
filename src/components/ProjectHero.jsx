export default function ProjectHero({ number, category, title, description, image, className = '' }) {
  return <section className={`project-hero container ${className}`}><div className="project-hero-copy"><p className="eyebrow">{number} / {category}</p><h1>{title}</h1>{description && <p className="lede">{description}</p>}</div>{image && <div className="hero-image" style={{ backgroundImage: `url(${image})` }} aria-label={`${title} project visual`} role="img" />}</section>
}
