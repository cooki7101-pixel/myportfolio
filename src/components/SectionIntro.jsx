export default function SectionIntro({ eyebrow, title, description, isShowEyeBrow = true, className = '' }) {
  return <div className={`section-intro ${className}`}>{isShowEyeBrow && eyebrow && <p className="eyebrow">{eyebrow}</p>}<p className="section-intro-title">{title}</p><p className="section-intro-description">{description}</p></div>
}
