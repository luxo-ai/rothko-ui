import type { CardCopy } from '../types';
import { COMPONENT_OVERRIDE, SEMANTIC_OVERRIDE, TYPOGRAPHY_OVERRIDE } from './usage/sourceCode';
import overrides from './overrides';

const themeCopy: CardCopy = {
  title: 'Theming Guide',
  description:
    'Customize and personalize your Rothko UI components with ease using our powerful theming capabilities. Take control of the visual style, colors, typography, and more to create a cohesive and branded experience for your applications.',
  sections: [
    {
      variant: 'h5',
      title: 'Dark Mode Support',
      body: 'Rothko UI provides built-in support for dark mode. This allows you to create visually striking and accessible interfaces. With a simple toggle, you can switch between light and dark themes seamlessly, enhancing the user experience and adapting to user preferences. Your preference can be set via the `themeMode` prop on the `RothkoProvider`',
    },
    {
      variant: 'h5',
      title: 'Style Overrides',
      subtitle:
        'You can easily override specific component styles by targeting their respective keys in the theme object. This allows you to fine-tune the appearance and behavior of individual components to align with your design vision.',
      body: [
        {
          variant: 'h6',
          title: 'Overriding Typography',
          body: [
            {
              body: "You can overridde the system's typography using the `overrides` prop on the `RothkoProvider`.",
            },
            {
              body: {
                kind: 'code',
                language: 'jsx',
                code: TYPOGRAPHY_OVERRIDE,
              },
            },
            {
              variant: 'body',
              title: 'All overridable elements',
              body: {
                kind: 'code',
                language: 'json',
                code: overrides.typographyJson,
              },
            },
          ],
        },
        {
          variant: 'h6',
          title: 'Overriding Component Colors',
          body: [
            {
              body: "You can overridde the system's component colorss using the `overrides` prop on the `RothkoProvider`.",
            },
            {
              body: {
                kind: 'code',
                language: 'jsx',
                code: COMPONENT_OVERRIDE,
              },
            },
            {
              variant: 'body',
              title: 'All overridable elements',
              body: {
                kind: 'code',
                language: 'json',
                code: overrides.componentJson,
              },
            },
          ],
        },
        {
          variant: 'h6',
          title: 'Overriding Semantic Colors',
          body: [
            {
              body: "You can overridde the system's semantic colorss using the `overrides` prop on the `RothkoProvider`.",
            },
            {
              body: {
                kind: 'code',
                language: 'jsx',
                code: SEMANTIC_OVERRIDE,
              },
            },
            {
              variant: 'body',
              title: 'All overridable elements',
              body: {
                kind: 'code',
                language: 'json',
                code: overrides.semanticJson,
              },
            },
          ],
        },
      ],
    },
  ],
};
export default themeCopy;
