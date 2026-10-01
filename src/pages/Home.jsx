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

export default function Home({ loadingFinished = false }) {
  const { hash } = useLocation()
  const heroRef = useRef(null)
  const [liquidGlassActive, setLiquidGlassActive] = useState(false)

  useLayoutEffect(() => {
    let splitText
    const context = gsap.context(() => {
      const boxes = gsap.utils.toArray([
        // '.home__product_design_box',
        '.home__department_of_visual_design_box',
        '.home__skills_box',
      ])
      const heroImage = '.home__hero-img-me'
      const heroText = '.home__hero-text'
      const heroTextSplit = '.home__hero-text-split'

      // 전체 텍스트가 아닌 내부 split 대상만 글자 단위로 분리합니다.
      splitText = SplitText.create(heroTextSplit, { type: 'chars' })

      // 로딩이 끝나기 전에는 시작 상태만 준비하고 애니메이션을 대기합니다.
      gsap.set(boxes, { opacity: 0, filter: 'blur(5px)' })
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
      timeline.to(boxes, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.35,
        ease: 'power2.out',
        onComplete: () => setLiquidGlassActive(true),
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
      {/* TODO: rough placeholder — real interactive hero to be built separately */}
      <section className="home__hero" ref={heroRef} data-node-id="380:3921">
        <div className="home__hero-text-wrap">
          {/* 우측아래에서 올라오면서 좌측상단으로 이동하는 애니메이션을 적용한 텍스트입니다. */}
          <p className="home__hero-text">
            {/* 각 텍스트를 쪼개서 글자 단위로 애니메이션을 적용할 수 있습니다. */}
            <span className="home__hero-text-split">YEONSU</span>
          </p>
        </div>
        <img src={`${import.meta.env.BASE_URL}assets/home/image-me.png`} alt="YEONSU" className="home__hero-img-me" />


        <div className="home__product_design_box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(calc(-50% - 320px), calc(-50% + 80px))' }}>
          {liquidGlassActive ? (
            <LiquidGlass
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
              <GlassBox width='235px' blur={0} opacity={0}
                iconSrc={`${import.meta.env.BASE_URL}assets/home/icon-x2.png`}
                lines={['Product', 'Designer']}
              />
            </LiquidGlass>
          ) : ("")}
        </div>


        <div
          className="home__department_of_visual_design_box"
          style={{
            position: 'absolute'
            , top: '50%', left: '50%'
            , transform: 'translate(calc(-50% - 320px), calc(-50% + 230px))'
          }}>
          <GlassBox width='189px'
            blur={3} opacity={0.2} curvature='12px'
            edgeRefraction={0.1} dispersion={0.2}
            distortion={2} fresnel={0.2}
            animationSpeed={0.5} waveStrength={0.2}
            iconSrc={`${import.meta.env.BASE_URL}assets/home/icon-01-x2.png`}
            lines={['DEPARTMENT', 'OF VISUAL', 'DESIGN']}
            flexDirection='column'
          />
        </div>
        <div
          className="home__skills_box"
          style={{
            position: 'absolute'
            , top: '50%', left: '50%'
            , transform: 'translate(calc(-50% + 380px), calc(-50% + 0px))'
          }}>
          <GlassBox width='264px'
            blur={3} opacity={0.2} curvature='12px'
            edgeRefraction={0.1} dispersion={0.2}
            distortion={2} fresnel={0.2}
            animationSpeed={0.5} waveStrength={0.2}
            iconSrc={`${import.meta.env.BASE_URL}assets/home/icon-01-x2.png`}
            flexDirection='column'
            items={[
              { iconSrc: `${import.meta.env.BASE_URL}assets/glass-box-fast-worker.png`, text: 'Fast Worker' },
              { iconSrc: `${import.meta.env.BASE_URL}assets/glass-box-communication.png`, text: 'Communication' },
              { iconSrc: `${import.meta.env.BASE_URL}assets/glass-box-perseverance.png`, text: 'Perseverance' },
              { iconSrc: `${import.meta.env.BASE_URL}assets/glass-box-ai.png`, text: 'AI Proficiency' },
            ]}
          />
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
            <div className="glass-box glass-box--column" style={{ width: '122px' }}>
              <div className="glass-box__icon" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}assets/home/igon-design.png`} alt="" />
              </div>
              <div className="glass-box__label">
                <span>DEPARTMENT</span>
                <span>OF VISUAL</span>
                <span>DESIGN</span>
              </div>
            </div>
          </div>

          <div className="home__product_design_box">
            <div className="glass-box" style={{ width: '235px', height: '118px' }}>
              <div className="glass-box__icon glass-box__icon--small" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}assets/home/icon-product-designer2.png`} alt="" />
              </div>
              <div className="glass-box__label">
                <span>Product</span>
                <span>Designer</span>
              </div>
            </div>
          </div>

          <div className="home__skills_box">
            <div className="glass-box glass-box--column" style={{ width: '191px' }}>
              <div className="glass-box__items">
                {[
                  { iconSrc: `${import.meta.env.BASE_URL}assets/home/igon-fast.png`, text: 'Fast Worker' },
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
