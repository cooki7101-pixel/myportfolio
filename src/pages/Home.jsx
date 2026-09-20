import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Header from '../components/Header'
import HomeFooter from '../components/HomeFooter'
import HomeProjectList from '../components/HomeProjectList'
import GlassBox from '../components/glassBox'
import '../componentsStyle/home.css'

export default function Home({ loadingFinished = false }) {
  const { hash } = useLocation()
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const boxes = gsap.utils.toArray([
        '.home__product_design_box',
        '.home__department_of_visual_design_box',
        '.home__skills_box',
      ])
      const heroImage = '.home__hero-img-me'
      const heroText = '.home__hero-text'

      // 로딩이 끝나기 전에는 시작 상태만 준비하고 애니메이션을 대기합니다.
      gsap.set(boxes, { opacity: 0, filter: 'blur(5px)' })
      gsap.set(heroImage, { opacity: 0, filter: 'blur(5px)', scale: 0.8 })
      gsap.set(heroText, { x: '100%', y: '100%' })
      if (!loadingFinished) return

      const timeline = gsap.timeline()
      timeline.to(heroText, {
        x: '0%',
        y: '0%',
        duration: 0.8,
        ease: 'power2.out',
      })
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
      })
    }, heroRef)

    return () => context.revert()
  }, [loadingFinished])

  // Lets Header's WORK link ("/#work") jump straight to the project list,
  // including when navigating in from another page.
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
          <p className="home__hero-text">YEONSU</p>
        </div>
        <img src="/assets/home/image-me.png" alt="YEONSU" className="home__hero-img-me" />
        <div className="home__product_design_box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(calc(-50% - 320px), calc(-50% + 80px))' }}>
          <GlassBox width='235px'
            blur={3} opacity={0.2} curvature='12px'
            edgeRefraction={0.1} dispersion={0.2}
            distortion={2} fresnel={0.2}
            animationSpeed={0.5} waveStrength={0.2}
            iconSrc='/assets/home/icon-x2.png'
            lines={['Product', 'Designer']}
          />
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
            iconSrc='/assets/home/icon-01-x2.png'
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
            iconSrc='/assets/home/icon-01-x2.png'
            flexDirection='column'
            items={[
              { iconSrc: '/assets/glass-box-fast-worker.png', text: 'Fast Worker' },
              { iconSrc: '/assets/glass-box-communication.png', text: 'Communication' },
              { iconSrc: '/assets/glass-box-perseverance.png', text: 'Perseverance' },
              { iconSrc: '/assets/glass-box-ai.png', text: 'AI Proficiency' },
            ]}
          />
        </div>

        <p className="home__hero-desc">
          빠른 작업 능력과 끝까지 놓치지 않는 세밀함으로<br /> 완성도 있는 프로젝트를 이끌어가는 <br />프로덕트 디자이너 김연수입니다.
        </p>
      </section>

      <div className="home__project-wrap" data-node-id="380:3948">
        <HomeProjectList id="work" />
      </div>

      <HomeFooter />
    </div>
  )
}
