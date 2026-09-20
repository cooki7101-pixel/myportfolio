import '../componentsStyle/comparison-hyundai.css'

/**
 * Hyundai case-study AS IS / TO BE comparison block — a section title above
 * two side-by-side full-height screenshots, each labeled AS IS / TO BE.
 * Reused for both "메인 페이지" (Comparison-Hyundai, node 483:4733) and
 * "견적내기 페이지" (ASISTOBE-section, node 483:4734) — same structure,
 * different image aspect ratios, so images render at their own natural
 * ratio rather than a forced crop.
 */
export default function ComparisonHyundai({
  title,
  asIsImage,
  toBeImage,
  // Same pattern as FeatureKakaoT's toBeLogo — a wordmark image above the
  // TO BE box instead of the plain "TO BE" text label.
  toBeLogo,
}) {
  return (
    <section className="comparison-hyundai" data-node-id="483:4733">
      <div className="comparison-hyundai__intro">
        <h3>{title}</h3>
      </div>
      <div className="comparison-hyundai__images">
        <div className="comparison-hyundai__item">
          <p className="comparison-hyundai__label">AS IS</p>
          <div className="comparison-hyundai__media">
            {asIsImage && <img src={asIsImage} alt="" />}
          </div>
        </div>
        <div className="comparison-hyundai__item comparison-hyundai__item--tobe">
          {toBeLogo ? (
            <img className="comparison-hyundai__tobe-logo" src={toBeLogo} alt="TO BE" />
          ) : (
            <p className="comparison-hyundai__label comparison-hyundai__label--tobe">TO BE</p>
          )}
          <div className="comparison-hyundai__media">
            {toBeImage && <img src={toBeImage} alt="" />}
          </div>
        </div>
      </div>
    </section>
  )
}
