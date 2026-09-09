import '../componentsStyle/home-footer.css'

export default function HomeFooter({ prop1 = '기본', email = 'cooki7101@naver.com', copyright = '© 2026 Designed by Yeonsu Kim' }) {
  const mobile = prop1 === '베리언트3'
  const compact = prop1 === '베리언트2' || mobile
  return <footer className={`home-footer home-footer--${mobile ? 'mobile' : compact ? 'compact' : 'default'}`} data-node-id="376:1237">
    <div className="home-footer__contents"><div className="home-footer__top"><div className="home-footer__contact"><h2>Connect!<br />Get in touch :)</h2><a href={`mailto:${email}`}>{email}<img src="/assets/footer-icon.svg" alt="" /></a></div><nav><a href="#linkedin">LINKEDIN</a><a href="#resume">RESUME</a><a href="#about">ABOUT</a><a href="#work">WORK</a></nav></div><div className="home-footer__bottom"><img src="/assets/footer-logo-desktop-white.svg" alt="김연수 포트폴리오" /><small>{copyright}</small></div></div>
  </footer>
}
