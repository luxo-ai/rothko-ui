import { Typography } from '@rothko-ui/ui';
import type { CardCopy } from '../types';

const themeCopy: CardCopy = {
  title: 'Theming Guide',
  description:
    'Customize and personalize your Rothko UI components with ease using our powerful theming capabilities. Take control of the visual style, colors, typography, and more to create a cohesive and branded experience for your applications.',
  sections: {
    darkLightMode: {
      headerVariant: 'h5',
      headerText: 'Dark Mode Support',
      body: (
        <Typography.body>
          Rothko UI provides built-in support for dark mode. This allows you to create visually
          striking and accessible interfaces. With a simple toggle, you can switch between light and
          dark themes seamlessly, enhancing the user experience and adapting to user preferences.
          Your preference can be set via the <code>themeMode</code> prop on the{' '}
          <code>RothkoProvider</code>
        </Typography.body>
      ),
    },
  },
};
export default themeCopy;
