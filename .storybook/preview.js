/** @type { import('@storybook/react').Preview } */

import '../src/design-system/variables.css';
import '../src/styles/accessibility.css';
import '../src/styles/mobile-responsive.css';
import '../src/styles/motion-system.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'syncscript',
      values: [
        {
          name: 'syncscript',
          value: '#FEFDFB',
        },
        {
          name: 'dark',
          value: '#111827',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
      ],
    },
  },
};

export default preview;

