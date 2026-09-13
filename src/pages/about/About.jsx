import '../../componentsStyle/about.css'

const traits = [
  'I AM SOCIABLE',
  'I AM ENTHUSIASTIC',
  'I LOVE TAKING PICTURES',
  'I LOVE ART',
  'I LOVE MUSIC',
  'I LOVE DOG',
]

const bioParagraphs = [
  '안녕하세요. 저는 계획을 세우고 목표를 향해 하나씩 해결해 나가는 과정을 좋아하는 프로덕트 디자이너 김연수입니다. 빠른 작업 속도와 높은 집중력으로 효율적으로 진행하면서도 마지막 디테일까지 놓치지 않으며 완성도를 높이는 것을 중요하게 생각합니다.',
  '저는 원래 시각디자인과를 전공하며 다양한 디자인 분야를 경험했고, 그 과정에서 교수님의 추천으로 실제 디자인 업무를 함께 해보기도 했습니다. 이러한 여러 디자인 영역을 배우면서 단순히 시각적인 결과물을 만드는 것보다는 사용자의 문제를 발견하고 더 나은 해결 방법을 찾아가는 프로덕트 디자인에 매력을 느꼈습니다. 반복적인 분석과 개선의 과정이 누군가에게는 어렵거나 지루하게 느껴질 수 있지만 저는 하나의 문제를 깊게 고민하고 작은 차이를 발견하며 완성도를 높여가는 과정에서 즐거움과 성취감을 느낍니다. 이러한 성향이 프로덕트 디자이너라는 방향을 선택하게 된 이유 중 하나입니다.',
  '디자인 외에도 전시를 보거나 여행하며 새로운 영감을 얻는 것을 좋아합니다. 다양한 공간과 사람들을 경험하고, 새로운 이야기를 듣는 과정은 사용자를 이해하고 더 좋은 경험을 설계하는 데에도 좋은 자극이 됩니다. 최근에는 디자인 스터디를 통해 팀원들과 서로의 생각과 관점을 나누며 꾸준히 성장하고 있습니다.',
  '디자인에 대한 이야기나 새로운 만남은 언제든 환영합니다. 편하게 연락 주세요 :)',
]

export default function About() {
  return (
    <div className="about" data-node-id="435:1566">
      <section className="about__content" data-node-id="435:1752">
        <h1 className="about__title" data-node-id="435:1666">
          HELLO!
          <br />
          I&apos;M YEONSU KIM
        </h1>

        <div className="about__body" data-node-id="435:1667">
          <div className="about__image" data-node-id="512:7020">
            {/* TODO: drop the real photo (Figma node 512:7020) into public/assets
                (e.g. about-photo.jpg) and swap this placeholder for an <img>. */}
          </div>

          <div className="about__traits" data-node-id="435:1669">
            <img className="about__quote-icon" src="/assets/about-quote-icon.svg" alt="" data-node-id="435:1670" />
            <ul className="about__trait-labels" data-node-id="435:1674">
              {traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__bio" data-node-id="435:1681">
          {bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
