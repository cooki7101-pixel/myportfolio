import '../componentsStyle/logo.css'

const logoAssets = {
  'desktop-black': '/assets/logo-desktop-black.svg',
  'desktop-white': '/assets/logo-desktop-white.svg',
  'mobile-black': '/assets/logo-mobile-black.svg',
  'mobile-white': '/assets/logo-mobile-white.svg',
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
