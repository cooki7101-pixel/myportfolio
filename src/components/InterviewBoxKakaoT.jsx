import SectionIntro from './SectionIntro'
import '../componentsStyle/interview-box-kakao-t.css'

/**
 * Kakao T case-study "User interviewsGroup" — unlike Passing's InterviewBox,
 * this one bundles its own section-intro text plus a light-gray image group
 * (two side-by-side images + one wide image below), each with a caption.
 * (Figma node 461:6046, component "InterviewBox-KakaoT".)
 */
export default function InterviewBoxKakaoT({
  eyebrow = 'USER INTERVIEWS',
  title = '실제로 어느 화면에서 얼마나 오래 멈춰 설까?',
  description = '사용자의 디지털 기기 사용 수준에 따라 어려운 지점을 확인하기 위해 10명의 참가자를 대상으로 디지털 리터러시 진단과 4단계 과업을 진행했습니다. 그 결과 수행 시간에는 차이가 있었지만 공통적으로 목적지 설정과 배차 실패·오류 대응에서 가장 크게 막혔습니다. 앞선 리뷰에서 발견한 호출 과정의 어려움이 실제 사용자에게서도 나타나는 것을 확인했습니다.',
  items = [{}, {}, {}],
}) {
  const media = ({ type = 'img', src, component }) => component || (src ? (type === 'video' ? <video autoPlay muted loop playsInline preload="auto"><source src={src} /></video> : <img src={src} alt="" />) : <div className="interview-box-kakao-t__placeholder" />)
  const [first, second, third] = items
  return (
    <section className="interview-box-kakao-t" data-node-id="461:6046">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="interview-box-kakao-t__group">
        <div className="interview-box-kakao-t__row">
          <figure className="interview-box-kakao-t__item">
            <div className="interview-box-kakao-t__media">{media(first || {})}</div>
            {first?.label && <figcaption>{first.label}</figcaption>}
          </figure>
          <figure className="interview-box-kakao-t__item">
            <div className="interview-box-kakao-t__media">{media(second || {})}</div>
            {second?.label && <figcaption>{second.label}</figcaption>}
          </figure>
        </div>
        <figure className="interview-box-kakao-t__item interview-box-kakao-t__item--wide">
          <div className="interview-box-kakao-t__media">{media(third || {})}</div>
          {third?.label && <figcaption>{third.label}</figcaption>}
        </figure>
      </div>
    </section>
  )
}
