export default function Section({ eyebrow, title, children, className = '' }) {
  return <section className={`section container ${className}`}><div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{children}</section>
}
