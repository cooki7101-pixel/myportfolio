import '../componentsStyle/feature-kakao-t.css'

/**
 * Kakao T case-study "MAIN FEATURES" block — an AS IS / TO BE screen
 * comparison on one side, eyebrow/title/description on the other.
 * (Figma node 461:5572, component "Feature-KakaoT".)
 */
export default function FeatureKakaoT({
  eyebrow = 'MAIN FEATURES 01',
  title = '시니어 맞춤형 간단 모드',
  description = '홈 화면에 택시 외 기능이 많고 고객센터도 내정보 탭 내 깊숙이 있어 시니어들이 필요한 기능을 찾기 어려웠습니다. 간단 모드를 별도로 제공하여 필요한 기능만 전면에 배치함으로서 기존 사용자의 이용 경험은 유지하면서 시니어의 탐색 부담을 줄였습니다.',
  asIsImage,
  toBeImage,
  // Optional video for the TO BE slot (e.g. a screen-recording .mov) — takes
  // priority over toBeImage when provided.
  toBeVideo,
  // Figma now shows a small wordmark image above the TO BE box instead of
  // the plain "TO BE" text label — falls back to the text label until the
  // logo asset is provided.
  toBeLogo,
  // ITERATION instances use a 10px gap under the TO BE logo (vs. 4px on the
  // main features) — pass variant="iteration" to match that Figma spec.
  variant,
}) {
  return (
    <section className={`feature-kakao-t${variant ? ` feature-kakao-t--${variant}` : ''}`} data-node-id="461:5572">
      <div className="feature-kakao-t__comparison">
        <div className="feature-kakao-t__as-is">
          <p className="feature-kakao-t__label">AS IS</p>
          <div className="feature-kakao-t__as-is-media">
            {asIsImage && <img src={asIsImage} alt="" />}
          </div>
        </div>
        <div className="feature-kakao-t__to-be">
          {toBeLogo ? (
            <img className="feature-kakao-t__to-be-logo" src={toBeLogo} alt="TO BE" />
          ) : (
            <p className="feature-kakao-t__label feature-kakao-t__label--to-be">TO BE</p>
          )}
          <div className="feature-kakao-t__to-be-media">
            {toBeVideo ? (
              <video autoPlay muted loop playsInline preload="auto">
                <source src={toBeVideo} />
              </video>
            ) : (
              toBeImage && <img src={toBeImage} alt="" />
            )}
          </div>
        </div>
      </div>
      <div className="feature-kakao-t__intro">
        <p className="feature-kakao-t__eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p className="feature-kakao-t__description">{description}</p>
      </div>
    </section>
  )
}
