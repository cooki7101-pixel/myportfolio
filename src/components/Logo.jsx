import '../componentsStyle/logo.css'

const logoAssets = {
<<<<<<< HEAD
  'desktop-black': `${import.meta.env.BASE_URL}assets/logo-desktop-black.svg`,
  'desktop-white': `${import.meta.env.BASE_URL}assets/logo-desktop-white.svg`,
  'mobile-black': `${import.meta.env.BASE_URL}assets/logo-mobile-black.svg`,
  'mobile-white': `${import.meta.env.BASE_URL}assets/logo-mobile-white.svg`,
=======
  'desktop-black': '/assets/logo-desktop-black.svg',
  'desktop-white': '/assets/logo-desktop-white.svg',
  'mobile-black': '/assets/logo-mobile-black.svg',
  'mobile-white': '/assets/logo-mobile-white.svg',
>>>>>>> master
}

/** Brand logo with desktop/mobile and black/white variants. */
export default function Logo({ variant = 'desktop-black', alt = '김연수 포트폴리오' }) {
  const asset = logoAssets[variant] || logoAssets['desktop-black']
  const isDesktop = variant.startsWith('desktop')

  return (
    <div className={`logo logo--${isDesktop ? 'desktop' : 'mobile'}`} data-node-id="291:1436">
      <img src={asset} alt={alt} />
    </div>
  )
}
