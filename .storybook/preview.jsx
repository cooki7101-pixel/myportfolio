import '../src/styles/reset.css'
import '../src/styles/variables.css'
import '../src/styles/global.css'
import '../src/styles/layout.css'
import '../src/styles/components.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
