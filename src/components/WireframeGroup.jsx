import SectionIntro from './SectionIntro'
import '../componentsStyle/wireframe-group.css'

export default function WireframeGroup({
  image,
  eyebrow = 'WIREFRAME',
  title = '핵심 기능 구현을 위한 화면 구조 설계',
  description = '정의한 사용자 흐름과 기능 구조를 바탕으로 와이어프레임을 제작했습니다. 시각적 요소보다 화면 간 연결과 주요 기능 배치를 검토하는 데 집중하고 아이디어를 빠르게 시각화하려 했습니다.',
}) {
  return (
    <section className="wireframe-group" data-node-id="334:2960">
      <div className="wireframe-group__inner">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="wireframe-group__media">
          {image ? <img src={image} alt="" /> : <div className="wireframe-group__placeholder" />}
        </div>
      </div>
    </section>
  )
}
