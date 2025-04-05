import { lazy } from 'react';

import type { CardCopy } from '@/components/card/types';

const overviewCopy: CardCopy = {
  title: 'Overview',
  description:
    'Welcome to rothko ui, a cutting-edge and lightweight UI component library designed to elevate your web development projects. rothko ui stands out from the crowd by offering a sleek and modern design aesthetic that aligns perfectly with the latest trends in UI/UX.',
  sections: [
    {
      title: 'Setup',
      body: [
        {
          variant: 'h6',
          title: 'Prerequisites',
          body: 'Rothko ui is built off of tailwindcss `v4.x`. To use rothko-ui, first follow the installation guide in the [official docs](https://tailwindcss.com/docs/installation/using-vite).',
        },
        {
          variant: 'h6',
          title: 'Installation',
          subtitle:
            'Rothko ui is available on npm as `@rothko-ui/react`. This single package contains all rothko ui components. The iconography library is separately available as `@rothko-ui/icons`. Style tokens are available through `@rothko-ui/tokens`.',
          body: {
            kind: 'code',
            language: 'bash',
            code: [
              {
                icon: lazy(() => import('@/components/icon/NpmSvg')),
                tag: 'npm',
                text: 'npm install @rothko-ui/react @rothko-ui/icons @rothko-ui/tokens',
              },
              {
                icon: lazy(() => import('@/components/icon/YarnSvg')),
                tag: 'yarn',
                text: 'yarn add @rothko-ui/react @rothko-ui/icons @rothko-ui/tokens',
              },
            ],
          },
        },
        {
          variant: 'h6',
          title: 'Registering Source Files',
          body: [
            {
              variant: 'body',
              body: "Wherever you've added `@import 'tailwindcss';` in your `globals.css` file, you'll need to register the rothko source files. You can do so using the `@source` directive.",
            },
            {
              body: {
                kind: 'code',
                language: 'css',
                hideBar: true,
                showLanguage: false,
                // showLineNumbers: true,
                code: ['@import "tailwindcss";', '@source "../../node_modules/@rothko-ui";'].join(
                  '\n'
                ),
              },
            },
            {
              variant: 'body',
              body: 'For more information on registering source files see the tailwindcss [docs](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources).',
              subtext: true,
            },
          ],
        },
        {
          variant: 'h6',
          title: 'Adding Theme Tokens',
          subtitle: 'You will need to add the theme tokens you installed in the first step.',
          body: [
            {
              body: {
                kind: 'code',
                language: 'css',
                hideBar: true,
                showLanguage: false,
                // showLineNumbers: true,

                code: [
                  '@import "tailwindcss";',
                  '@source "../../node_modules/@rothko-ui";',
                  '@import "@rothko-ui/tokens/style.css";',
                ].join('\n'),
              },
            },
          ],
        },
      ],
    },
    {
      title: 'Usage',
      subtitle:
        'After setting up you `global.css` file, you can now import and use the components:',
      body: {
        kind: 'code',
        language: 'jsx',
        showLanguage: false,
        code: [
          "import { Button } from '@rothko-ui/react';",
          '',
          'function MyComponent() {',
          '  return <Button>Click Me</Button>;',
          '}',
        ].join('\n'),
      },
    },
    {
      title: 'Philosophy',
      body: 'Compound components enhance UI library design by pairing a parent component with its children to create reusable, yet customizable, functional units. This pattern allows for implicit state management and a more expressive API, while also exposing the individual building blocks so users can style and arrange them as needed. Learn more about this powerful technique [here](https://kentcdodds.com/blog/compound-components-with-react-hooks).',
    },
    {
      title: 'SSR / Next.js',
      subtitle:
        "In Next.js with Server-Side Rendering (SSR), components that utilize React Context from rothko-ui require the `'use client'` directive. This is because React Context relies on client-side rendering and is not supported in SSR.",
      body: {
        kind: 'code',
        language: 'jsx',
        code: [
          "'use client';",
          "import { Accordion, AccordionPanel } from '@rothko-ui/react';",
          '',
          'export default function MyComponent() { ',
          '  return (',
          '    <Accordion>',
          '      <AccordionPanel label="My Label 1">',
          '        Content 1',
          '      </AccordionPanel>',
          '      <AccordionPanel label="My Label 2">',
          '        Content 2',
          '      </AccordionPanel>',
          '    </Accordion>',
          '  );',
          '}',
        ].join('\n'),
      },
    },
    {
      variant: 'h4',
      title: 'Next Steps',
      body: 'Check out the [theming](/theming) section, to better understand how to customize rothko ui to your needs.',
    },
  ],
};

export default overviewCopy;
