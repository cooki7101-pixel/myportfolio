import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import HomeFooter from '../components/HomeFooter'
import HomeProjectList from '../components/HomeProjectList'
import GlassBox from '../components/glassBox'
import '../componentsStyle/home.css'

export default function Home() {
  const { hash } = useLocation()

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
      <section className="home__hero" data-node-id="380:3921">
        <img src="/assets/home/image-YEONSU-text.png" alt="YEONSU" className="home__hero-img-text" />
        <img src="/assets/home/image-me.png" alt="YEONSU" className="home__hero-img-me" />
        <GlassBox width='300px' />
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
