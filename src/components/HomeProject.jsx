import '../componentsStyle/home-project.css'

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.filter((tag) => typeof tag === 'string' && tag.trim())
  if (typeof tags === 'string') return tags.split(/[,\n]/).map((tag) => tag.trim()).filter(Boolean)
  return []
}

export default function HomeProject({
  prop1 = '기본',
  title = '제목을 간단하게\n입력하세요',
  description = '프로젝트의 자세한 내용들을\n입력하세요.',
  tags = ['#AI AGENT', '#SENIOR', '#SENIOR'],
  videoType = 'video',
  videoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
}) {
  const variant = prop1 === 'mobile' ? 'mobile' : prop1 === 'tablet' ? 'tablet' : 'desktop'
  const normalizedTags = normalizeTags(tags)
  return <article className={`home-project home-project--${variant}`} data-node-id="396:5291">
    <div className="home-project__media">{videoType === 'img' ? <img src={videoSrc} alt="" /> : <video autoPlay muted loop playsInline preload="auto" aria-label={title}><source src={videoSrc} /></video>}</div>
    <div className="home-project__gradient" />
    <div className="home-project__tags">{normalizedTags.map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}</div>
    <div className="home-project__contents"><h3>{title}</h3><p>{description}</p></div>
  </article>
}
