import '../componentsStyle/phase-intro.css'

export default function PhaseIntro({
  breakpoint = 'desktop',
  desc = "왜 사용자는 '사기 위험'을 알면서도 X(트위터)에서의 티켓 거래를 멈추지 못할까?",
  headline = '“Why do users keep trading Tickets on x(Twitter) despite the risk of scams?”',
  title = 'EMPATHIZE',
}) {
  return (
    <section className={`phase-intro phase-intro--${breakpoint}`} data-node-id="348:5141">
      <p className="phase-intro__title">{title}</p>
      <div className="phase-intro__contents">
        <p className="phase-intro__headline">{headline}</p>
        <p className="phase-intro__description">{desc}</p>
      </div>
    </section>
  )
}
