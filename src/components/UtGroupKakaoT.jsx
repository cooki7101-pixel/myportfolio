import { useEffect, useState } from 'react'
import SectionIntro from './SectionIntro'
import '../componentsStyle/ut-group-kakao-t.css'

// 카카오T 프로젝트 페이지 전용 UT 그룹 (Figma node 679:3374).
// 공용 UtGroup과 사진/문서 비율, 테두리 위치, 브레이크포인트 기준이 달라서
// 별도 컴포넌트로 분리했습니다. Header.jsx와 같은 방식으로 뷰포트 너비를
// 직접 측정해서 desktop/tablet/mobile 세 가지 모드 중 하나로 렌더링합니다
// (CSS 미디어쿼리 우선순위 문제로 헷갈리지 않도록).
const MOBILE_MAX_WIDTH = 641
const TABLET_MAX_WIDTH = 1199

function getBreakpoint() {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width <= MOBILE_MAX_WIDTH) return 'mobile'
  if (width <= TABLET_MAX_WIDTH) return 'tablet'
  return 'desktop'
}

export default function UtGroupKakaoT({
  photos = [],
  docs = [],
  eyebrow = 'USABILITY TEST',
  title = '호출 과정의 사용성 평가',
  description = '7명의 시니어를 대상으로 과업을 진행하여 호출 성공 여부와 오류 상황에서 스스로 복구할 수 있는지를 확인했습니다. SEQ 평균 98점, SUS 평균 94점으로 사용성은 긍정적이었고 평균 수행 시간도 4분 41초에서 1분 30초로 약 68% 단축되었습니다.',
  docCaption1 = 'UT TASKS SEQ 점수',
  docCaption2 = 'SUS 점수',
}) {
  const [photo1, photo2] = photos
  const [doc1, doc2] = docs
  const [breakpoint, setBreakpoint] = useState(getBreakpoint)

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint())
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return (
    <section className={`ut-group-kakao-t ut-group-kakao-t--${breakpoint}`} data-node-id="679:3374">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="ut-group-kakao-t__photos">
        <div className="ut-group-kakao-t__photo">{photo1 ? <img src={photo1} alt="" /> : null}</div>
        <div className="ut-group-kakao-t__photo">{photo2 ? <img src={photo2} alt="" /> : null}</div>
      </div>

      <div className="ut-group-kakao-t__docs">
        <div className="ut-group-kakao-t__doc">
          <div className="ut-group-kakao-t__doc-media">{doc1 ? <img src={doc1} alt="" /> : null}</div>
          <p className="ut-group-kakao-t__doc-caption">{docCaption1}</p>
        </div>
        <div className="ut-group-kakao-t__doc ut-group-kakao-t__doc--bordered">
          <div className="ut-group-kakao-t__doc-media">{doc2 ? <img src={doc2} alt="" /> : null}</div>
          <p className="ut-group-kakao-t__doc-caption">{docCaption2}</p>
        </div>
      </div>
    </section>
  )
}
