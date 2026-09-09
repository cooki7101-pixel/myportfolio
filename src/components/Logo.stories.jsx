import Logo from './Logo'

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    variant: {
      control: 'select',
      options: ['desktop-black', 'desktop-white', 'mobile-black', 'mobile-white'],
    },
  },
  args: {
    variant: 'desktop-black',
  },
}

export const DesktopBlack = {}

export const DesktopWhite = {
  args: { variant: 'desktop-white' },
  parameters: { backgrounds: { default: 'dark' } },
}

export const MobileBlack = {
  args: { variant: 'mobile-black' },
}

export const MobileWhite = {
  args: { variant: 'mobile-white' },
  parameters: { backgrounds: { default: 'dark' } },
}
