import SectionIntro from './SectionIntro'
import '../componentsStyle/responsive-hyundai.css'

/**
 * Hyundai case-study responsive breakpoint showcase — a section title
 * (optionally with eyebrow) followed by three device mockups
 * (Desktop / Tablet / Mobile) shown side by side. Reused for both
 * "메인 페이지" (Responsive-Mainp-section, node 483:4747) and
 * "견적내기 페이지" (Responsive-subp-section, node 483:4748) — same
 * structure, different image aspect ratios, so each image renders at its
 * own natural ratio rather than a forced crop.
 */
export default function ResponsiveHyundai({
  eyebrow,
  title,
  desktopImage,
  tabletImage,
  mobileImage,
}) {
  return (
    <section className="responsive-hyundai" data-node-id="483:4747">
      <SectionIntro
        isShowEyeBrow={Boolean(eyebrow)}
        eyebrow={eyebrow}
        title={title}
        description=""
      />
      <div className="responsive-hyundai__row">
        <div className="responsive-hyundai__item responsive-hyundai__item--desktop">
          <p className="responsive-hyundai__label">Desktop(1920px)</p>
          <div className="responsive-hyundai__media">
            {desktopImage && <img src={desktopImage} alt="" />}
          </div>
        </div>
        <div className="responsive-hyundai__item responsive-hyundai__item--tablet">
          <p className="responsive-hyundai__label">Tablet(1112px)</p>
          <div className="responsive-hyundai__media">
            {tabletImage && <img src={tabletImage} alt="" />}
          </div>
        </div>
        <div className="responsive-hyundai__item responsive-hyundai__item--mobile">
          <p className="responsive-hyundai__label">Mobile(402px)</p>
          <div className="responsive-hyundai__media">
            {mobileImage && <img src={mobileImage} alt="" />}
          </div>
        </div>
      </div>
    </section>
  )
}
