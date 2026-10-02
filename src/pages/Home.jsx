import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Header from '../components/Header'
import HomeFooter from '../components/HomeFooter'
import HomeProjectList from '../components/HomeProjectList'
import '../componentsStyle/glassBox.css'
import GlassBox from '../components/GlassBox'
import { LiquidGlass } from 'quidlass';
import '../componentsStyle/home.css'

gsap.registerPlugin(SplitText)

const MOBILE_GLASS_PROPS = {
  borderRadius: 10,
  blur: 6,
  contrast: 1.2,
  brightness: 1.05,
  saturation: 1.2,
  shadowIntensity: 0.28,
  elasticity: 0.27,
  elasticityActivationZone: 100,
  swirlIntensity: 12.3,
  swirlScale: 0.8,
  swirlRadius: 1.1,
  edgeThicknessPx: 24,
  swirlEdges: 'all',
  zIndex: 3,
  enableInnerGlow: true,
  style: { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
}
// 데스크탑 GlassBox(blur 0 / opacity 0)와 동일하게 자체 배경·블러를 없애
// 유리 효과는 LiquidGlass가 전담하게 합니다.
const MOBILE_BOX_VARS = { '--glass-box-opacity': 0, '--glass-box-blur': '0px' }

export default function Home({ loadingFinished = false }) {
  const { hash } = useLocation()
  const heroRef = useRef(null)
  const [liquidGlassActive, setLiquidGlassActive] = useState(false)

  useLayoutEffect(() => {
    let splitText
    const context = gsap.context(() => {
      // 모바일 박스는 기존 일반 glass-box라 예전 모션(opacity+blur) 그대로.
      // 데스크탑 유리 박스: backdrop-filter가 걸린 요소의 "조상"에 opacity나
      // filter를 걸면 유리가 뒤를 못 보고 빈 패널이 되기 때문에, 박스 전체가
      // 아니라 유리를 이루는 레이어들(LiquidGlass 내부 배경 레이어 + glass-box)
      // "자기 자신"의 opacity만 0→1로 올립니다 — 자기 opacity는 자기 효과와
      // 함께 자연스럽게 페이드되고 뒤 비침은 유지됩니다. 글자/아이콘은 예전처럼
      // opacity+blur로 나타납니다.
      const glassEnter = gsap.utils.toArray('.home__glass-enter')
      const glassParts = glassEnter.map((box) => ({
        // LiquidGlass 바깥 껍데기(style의 옅은 흰 배경이 칠해진 요소) — 이건
        // backdrop-filter 요소들의 조상이라 opacity를 걸 수 없어서 배경색
        // 알파값만 0→목표값으로 올립니다.
        root: box.querySelector(':scope > div'),
        layers: gsap.utils.toArray(
          box.querySelectorAll(':scope > div > div:not(:last-child), .glass-box'),
        ),
        content: gsap.utils.toArray(
          box.querySelectorAll('.glass-box__icon, .glass-box__label, .glass-box__items'),
        ),
      }))
      const allGlassLayers = glassParts.flatMap((p) => p.layers)
      const allGlassContent = glassParts.flatMap((p) => p.content)
      const heroImage = '.home__hero-img-me, .home__hero-mobile-img-me'
      const heroText = '.home__hero-text'
      const heroTextSplit = '.home__hero-text-split'

      // 전체 텍스트가 아닌 내부 split 대상만 글자 단위로 분리합니다.
      splitText = SplitText.create(heroTextSplit, { type: 'chars' })

      // 로딩이 끝나기 전에는 시작 상태만 준비하고 애니메이션을 대기합니다.
      gsap.set(allGlassLayers, { opacity: 0 })
      gsap.set(
        glassParts.map((p) => p.root).filter(Boolean),
        { backgroundColor: 'rgba(255, 255, 255, 0)' },
      )
      gsap.set(allGlassContent, { opacity: 0, filter: 'blur(5px)' })
      gsap.set(heroImage, { opacity: 0, filter: 'blur(5px)', scale: 0.8 })
      gsap.set(heroText, { x: '100%', y: '100%' })
      gsap.set(splitText.chars, { yPercent: 100 })
      setLiquidGlassActive(false)
      if (!loadingFinished) return

      const timeline = gsap.timeline()
      timeline.to(heroText, {
        x: '0%',
        y: '0%',
        duration: 0.8,
        ease: 'power2.out',
      })
      timeline.to(splitText.chars, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      }, '<')
      timeline.to(heroImage, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
      timeline.addLabel('boxesIn')
      // 박스마다 0.35초 간격으로 차례로(기존 stagger와 동일) 등장
      glassParts.forEach((part, i) => {
        // 데스크탑 3개 + 모바일 3개가 같이 잡히므로 i % 3으로 각 세트 안에서 차례로 등장
        const at = `boxesIn+=${(i % 3) * 0.35}`
        if (part.root) {
          timeline.to(part.root, {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            duration: 0.8,
            ease: 'power2.out',
          }, at)
        }
        timeline.to(part.layers, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          // 레이어가 원래 갖고 있던 값(투명도 등)으로 복원
          onComplete: () => gsap.set(part.layers, { clearProps: 'opacity' }),
        }, at)
        timeline.to(part.content, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(part.content, { clearProps: 'opacity,filter' })
            if (i === glassParts.length - 1) setLiquidGlassActive(true)
          },
        }, at)
      })
    }, heroRef)

    return () => {
      splitText?.revert()
      context.revert()
    }
  }, [loadingFinished])

  // Header의 WORK 링크("/#work")를 눌렀을 때 프로젝트 목록으로 바로
  // 이동하게 함 — 다른 페이지에서 들어오는 경우도 포함.
  useEffect(() => {
    if (hash !== '#work') return
    const target = document.getElementById('work')
    target?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div className="home" data-node-id="380:3913" >
      <Header />
      {/* TODO: 대략적인 임시 구현 — 실제 인터랙티브 히어로는 별도로 제작 예정 */}
      <section className="home__hero" ref={heroRef} data-node-id="380:3921">
        <div className="home__hero-text-wrap">
          {/* 우측아래에서 올라오면서 좌측상단으로 이동하는 애니메이션을 적용한 텍스트입니다. */}
          <p className="home__hero-text">
            {/* 각 텍스트를 쪼개서 글자 단위로 애니메이션을 적용할 수 있습니다. */}
            <span className="home__hero-text-split">YEONSU</span>
          </p>
        </div>
        <img src={`${import.meta.env.BASE_URL}assets/home/image-me.svg`} alt="YEONSU" className="home__hero-img-me" />


        {/* YEONSU 텍스트(font-size)와 me 이미지(width)는 min(100vw,1920px)/1920px
            비율로 줄어드는데, 이 박스들은 transform의 px 오프셋(320px, 80px 등)이
            고정값이라 화면이 좁아져도 그대로 유지돼서 다른 요소들과 같은 자리에서
            줄어들지 않고 점점 어긋나 보였습니다 — 오프셋에도 똑같은 비율을 곱해서
            같은 기준으로 함께 줄어들게 맞춥니다. */}
        <div className="home__product_design_box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(calc(-50% - 320px * min(100vw, 1920px) / 1920px), calc(-50% + 80px * min(100vw, 1920px) / 1920px))' }}>
          <div className="home__glass-enter">
            <LiquidGlass
              borderRadius={10}
              blur={6}
              contrast={1.2}
              brightness={1.05}
              saturation={1.2}
              shadowIntensity={0.28}
              elasticity={0.27}
              elasticityActivationZone={100}
              swirlIntensity={12.3}
              swirlScale={0.8}
              swirlRadius={1.1}
              edgeThicknessPx={24}
              swirlEdges="all"
              zIndex={3}
              enableInnerGlow
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <GlassBox curvature={10} width='235px' blur={0} opacity={0}
                iconSrc={`${import.meta.env.BASE_URL}assets/home/icon-product-designer2.png`}
                lines={['Product', 'Designer']}
              />
            </LiquidGlass>
          </div>
        </div>


        <div
          className="home__department_of_visual_design_box"
          style={{
            position: 'absolute'
            , top: '50%', left: '50%'
            , transform: 'translate(calc(-50% - 320px * min(100vw, 1920px) / 1920px), calc(-50% + 230px * min(100vw, 1920px) / 1920px))'
          }}>
          {/* liquidGlassActive로 가리지 않고 처음부터 렌더링합니다 — 이 박스
              자체는 이미 gsap의 boxes 배열에 들어있어서 opacity/blur로
              기존 등장 모션이 그대로 적용되고, 유리 효과(LiquidGlass)만
              Product Designer 박스와 동일하게 적용됩니다. */}
          {/* home__glass-enter: 등장 모션(위로 올라오며 커짐)을 transform만으로
              주는 안쪽 래퍼입니다. filter/opacity가 걸린 조상 밑에서는 안쪽
              backdrop-filter가 뒤를 못 보는데, transform은 그런 제약이 없어서
              모션 도중에도 유리효과가 계속 비칩니다. */}
          <div className="home__glass-enter">
            <LiquidGlass
              borderRadius={10}
              blur={6}
              contrast={1.2}
              brightness={1.05}
              saturation={1.2}
              shadowIntensity={0.28}
              elasticity={0.27}
              elasticityActivationZone={100}
              swirlIntensity={12.3}
              swirlScale={0.8}
              swirlRadius={1.1}
              edgeThicknessPx={24}
              swirlEdges="all"
              zIndex={3}
              enableInnerGlow
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <GlassBox curvature={10} width='189px' blur={0} opacity={0}
                iconSrc={`${import.meta.env.BASE_URL}assets/home/icon-design.png`}
                lines={['DEPARTMENT', 'OF VISUAL', 'DESIGN']}
                flexDirection='column'
              />
            </LiquidGlass>
          </div>
        </div>
        <div
          className="home__skills_box"
          style={{
            position: 'absolute'
            , top: '50%', left: '50%'
            , transform: 'translate(calc(-50% + 380px * min(100vw, 1920px) / 1920px), calc(-50% + 0px))'
          }}>
          <div className="home__glass-enter">
            <LiquidGlass
              borderRadius={10}
              blur={6}
              contrast={1.2}
              brightness={1.05}
              saturation={1.2}
              shadowIntensity={0.28}
              elasticity={0.27}
              elasticityActivationZone={100}
              swirlIntensity={12.3}
              swirlScale={0.8}
              swirlRadius={1.1}
              edgeThicknessPx={24}
              swirlEdges="all"
              zIndex={3}
              enableInnerGlow
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <GlassBox curvature={10} width='264px' blur={0} opacity={0}
                flexDirection='column'
                items={[
                  { iconSrc: `${import.meta.env.BASE_URL}assets/home/icon-fast.png`, text: 'Fast Worker' },
                  { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-communication.png`, text: 'Communication' },
                  { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-Perseverance.png`, text: 'Perseverance' },
                  { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-ai.png`, text: 'AI Proficiency' },
                ]}
              />
            </LiquidGlass>
          </div>
        </div>

        {/* home__hero-desc는 일부러 home__hero-stage 밖에 둡니다 — stage에
            transform(scale)이 걸려 있으면 CSS 스펙상 그 transform이
            position:fixed 자식의 기준(containing block)이 돼버려서, 진짜
            브라우저 뷰포트가 아니라 stage 박스 기준으로 "고정"되는 바람에
            화면에 안 붙고 다른 요소에 가려지는 문제가 있었습니다. stage
            밖으로 꺼내야 CSS의 position:fixed(뷰포트 하단 60px 고정)가
            의도대로 동작합니다. */}
        <p className="home__hero-desc">
          빠른 작업 능력과 끝까지 놓치지 않는<br />
          세밀함으로 완성도 있는 프로젝트를<br />
          이끌어가는 프로덕트 디자이너 김연수입니다.
        </p>



        {/* 모바일(681px 이하) 전용 hero 레이아웃!!! — Figma 모바일 가이드
    (node 402:6128) 기준 */}
        <div className="home__hero-mobile-stage">
          <div className="home__hero-text-wrap">
            {/* 우측아래에서 올라오면서 좌측상단으로 이동하는 애니메이션을 적용한 텍스트입니다. */}
            <p className="home__hero-text">
              {/* 각 텍스트를 쪼개서 글자 단위로 애니메이션을 적용할 수 있습니다. */}
              <span className="home__hero-text-split">YEONSU</span>
            </p>
          </div>
          <img src={`${import.meta.env.BASE_URL}assets/home/image-me-mobile.svg`} alt="YEONSU" className="home__hero-mobile-img-me" />

          <div className="home__department_of_visual_design_box">
            <div className="home__glass-enter">
              <LiquidGlass {...MOBILE_GLASS_PROPS}>
                <div className="glass-box glass-box--column" style={{ width: '122px', ...MOBILE_BOX_VARS }}>
                  <div className="glass-box__icon" aria-hidden="true">
                    <img src={`${import.meta.env.BASE_URL}assets/home/icon-design.png`} alt="" />
                  </div>
                  <div className="glass-box__label">
                    <span>DEPARTMENT</span>
                    <span>OF VISUAL</span>
                    <span>DESIGN</span>
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </div>

          <div className="home__product_design_box">
            <div className="home__glass-enter">
              <LiquidGlass {...MOBILE_GLASS_PROPS}>
                <div className="glass-box" style={{ width: '235px', height: '118px', ...MOBILE_BOX_VARS }}>
                  <div className="glass-box__icon glass-box__icon--small" aria-hidden="true">
                    <img src={`${import.meta.env.BASE_URL}assets/home/icon-product-designer2.png`} alt="" />
                  </div>
                  <div className="glass-box__label">
                    <span>Product</span>
                    <span>Designer</span>
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </div>

          <div className="home__skills_box">
            <div className="home__glass-enter">
              <LiquidGlass {...MOBILE_GLASS_PROPS}>
                <div className="glass-box glass-box--column" style={{ width: '191px', ...MOBILE_BOX_VARS }}>
                  <div className="glass-box__items">
                    {[
                      { iconSrc: `${import.meta.env.BASE_URL}assets/home/icon-fast.png`, text: 'Fast Worker' },
                      { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-communication.png`, text: 'Communication' },
                      { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-Perseverance.png`, text: 'Perseverance' },
                      { iconSrc: `${import.meta.env.BASE_URL}assets/home/Icon-ai.png`, text: 'AI Proficiency' },
                    ].map((item) => (
                      <div className="glass-box__item" key={item.text}>
                        <div className="glass-box__item-icon" aria-hidden="true">
                          <img src={item.iconSrc} alt="" />
                        </div>
                        <span className="glass-box__item-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </div>

          <p className="home__hero-mobile-desc">
            빠른 작업 능력과 끝까지 놓치지 않는<br />
            세밀함으로 완성도 있는 프로젝트를<br />
            이끌어가는 프로덕트 디자이너 김연수입니다.
          </p>
        </div>
      </section>

      <div className="home__project-wrap" data-node-id="380:3948">
        <HomeProjectList id="work" />
      </div>

      <HomeFooter />
    </div >
  )


}
