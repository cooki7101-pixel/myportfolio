import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";
import ProjectGrid from "../components/ProjectGrid";

export default function Home() {
  return (
    <>
      <Header />
      <section className="home-hero container">
        <p className="eyebrow">UX / UI Designer & Visual Thinker</p>
        <h1>
          Making space
          <br />
          for <em>better ideas.</em>
        </h1>
        <p className="lede">
          A starter portfolio for documenting thoughtful digital experiences,
          experiments, and everything in between.
        </p>
        <Link className="text-link" to="/about">
          More about me <span>↗</span>
        </Link>
      </section>
      <section
        eyebrow="01 / Intro"
        title="I turn questions into clear, useful experiences."
      >
        <div className="intro-copy">
          <p>
            Use this space to introduce your point of view. Replace this
            placeholder with a short statement about what you care about, how
            you work, or what you are currently exploring.
          </p>
          <p className="muted">
            Currently available for selected projects · Seoul, KR
          </p>
        </div>
      </section>
      <section
        eyebrow="02 / Selected works"
        title="A few things I’ve made."
        className="works-section"
      >
        <ProjectGrid />
      </section>
      <HomeFooter />
    </>
  );
}
