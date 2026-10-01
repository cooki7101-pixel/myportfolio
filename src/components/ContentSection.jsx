import SectionIntro from './SectionIntro'
import '../componentsStyle/content-section.css'

export default function ContentSection({ layout = 'vertical', items = [], eyebrow, title, description, showEyebrow = true }) {
  const media = ({ type = 'img', src, component }) => component || (src ? (type === 'video' ? <video autoPlay muted loop playsInline preload="auto"><source src={src} /></video> : <img src={src} alt="" />) : <div className="content-section__placeholder" />)
  const visibleItems = items.slice(0, layout === 'vertical' ? 2 : 1)
  return <section className={`content-section content-section--${layout}`} data-node-id="312:391">
    <SectionIntro isShowEyeBrow={showEyebrow} {...(eyebrow !== undefined && { eyebrow })} {...(title !== undefined && { title })} {...(description !== undefined && { description })} />
    {visibleItems.map((item, index) => <figure className="content-section__block" key={`${item.label || 'media'}-${index}`}><div className="content-section__media">{media(item)}</div>{item.label && <figcaption>{item.label}</figcaption>}</figure>)}
  </section>
}
