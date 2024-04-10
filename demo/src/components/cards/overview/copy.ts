import { lazy } from 'react';

import type { CardCopy } from '../types';
import { ROTHKO_PROVIDER } from './usage/sourceCode';

const overviewCopy: CardCopy = {
  title: 'Overview',
  description:
    'Welcome to Rothko UI, a cutting-edge and lightweight UI component library designed to elevate your web development projects. Rothko UI stands out from the crowd by offering a sleek and modern design aesthetic that aligns perfectly with the latest trends in UI/UX.',
  sections: [
    {
      title: 'Setup',
      body: {
        variant: 'h6',
        title: 'Installing Rothko UI',
        subtitle:
          'Rothko UI is available on npm as `@rothko-ui/ui`. This single package contains all Rothko UI components. The iconography library is separately available as `@rothko-ui/icons`.',
        body: {
          kind: 'code',
          language: 'bash',
          code: [
            {
              icon: lazy(() => import('./NpmSvg')),
              tag: 'npm',
              text: 'npm install @rothko-ui/ui @rothko-ui/icons',
            },
            {
              icon: lazy(() => import('./YarnSvg')),
              tag: 'yarn',
              text: 'yarn add @rothko-ui/ui @rothko-ui/icons',
            },
          ],
        },
      },
    },
    {
      title: 'Features',
      body: [
        {
          variant: 'body',
          title: 'Modern and Minimalist Design',
          body: "Rothko UI's default styling reflects the contemporary design landscape, featuring cleaner lines and a minimalist approach. You can create sleek and sophisticated interfaces that effortlessly align with the latest design trends. The library places a strong emphasis on component design that feels natural for mobile or tablet devices, ensuring a seamless user experience across the modern web.",
        },
        {
          variant: 'body',
          title: 'Lightweight Package',
          body: 'Rothko UI is designed with efficiency in mind. The library offers a lightweight package, ensuring fast loading times and optimal performance for your applications. You can enjoy the benefits of a robust UI component library without sacrificing speed or resource consumption.',
        },
        {
          variant: 'body',
          title: 'Strong Customization',
          body: "Rothko UI provides extensive customization options to tailor the components to your project's specific needs. From colors and typography to layout and interaction, you have the power to create a unique and personalized UI. The library empowers developers to shape their applications according to their vision.",
        },
      ],
    },
    {
      title: 'Rothko Provider',
      subtitle:
        'To utilize the full capabilities of Rothko-UI components, it is important to wrap your main app with the Rothko-UI Context Provider. This context provider ensures that the necessary configuration and state are accessible throughout your application.',
      body: {
        kind: 'code',
        code: ROTHKO_PROVIDER,
        language: 'jsx',
      },
    },
    {
      title: 'SSR',
      body: "Rothko UI uses [styled-components](https://styled-components.com/) to style its components. If you are using Rothko UI in a server-side rendered app, you will need to ensure that the style sheets are generated correctly. For [Next.js](https://nextjs.org/) apps you'll need to use `ServerStyleSheet`.",
    },
    {
      title: 'Next Steps',
      body: 'Check out the [theming](/theming) section, to better understand how to customize Rothko UI to your needs.',
    },
  ],
};

export default overviewCopy;
