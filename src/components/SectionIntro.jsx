import '../componentsStyle/section-intro.css'

/**
 * A compact section heading with an optional eyebrow, title, and description.
 */
export default function SectionIntro({
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
  eyebrow = 'eyebrow',
  isShowEyeBrow = true,
  title = 'What is Lorem Ipsum?',
}) {
  return (
    <section className="section-intro" data-node-id="291:864">
      {isShowEyeBrow && <p className="section-intro__eyebrow">{eyebrow}</p>}
      <h2 className="section-intro__title">{title}</h2>
      <p className="section-intro__description">{description}</p>
    </section>
  )
}
