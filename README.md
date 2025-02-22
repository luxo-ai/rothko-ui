<img src="./assets/logo.png" alt="rothko-ui"/>

# rothko-ui

Welcome to rothko-ui, an expressive react component library designed with flexibility in mind.

### Key Packages

- `@rothko-ui/react` The main package containing all components.

- `@rothko-ui/system` Shared components, helper functions, and React hooks.

- `@rothko-ui/icons` A set of customizable SVG icons.

- `@rothko-ui/tokens` A style system to generates CSS variables for theming.

## Using rothko-ui

### Installation

##### tailwindcss 🌀

Rothko-ui is built off of tailwindcss v4.x. To use rothko-ui, first follow the installation guide in the [official docs](https://tailwindcss.com/docs/installation/using-vite).

##### rothko-ui 🖌️

Once you've gotten tailwind set-up, you can now install the rothko packages:

```bash
yarn add @rothko-ui/react @rothko-ui/icons @rothko-ui/tokens
```

### Registering sources

Wherever you've added `@import "tailwindcss";`
In you `globals.css` file, you'll need to register the rothko source files. You can do so using the `@source` directive.

```css
@import 'tailwindcss';
@source '../../node_modules/@rothko-ui';
```

**Note**: Depending on the structure of your project, `node_modules` may be located in a different location.

For more information on registering source files see the tailwindcss [docs](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources).

### Adding theme tokens

You'll then need to add the theme tokens you installed in first step.

```css
@import 'tailwindcss';
@source "../../node_modules/@rothko-ui";
@import '@rothko-ui/tokens/style.css';
```

## Basic Component Usage

After setting up you `global.css` file, you can now import and use the components:

```jsx
import { Button } from '@rothko-ui/react';

function MyComponent() {
  return <Button>Click Me</Button>;
}
```

### Using Icons

The `@rothko-ui/icons` package provides a range of useful SVG icons:

```jsx
import { HeartIcon } from '@rothko-ui/icons';

function MyComponent() {
  return <HeartIcon />;
}
```

## Next.js / SSR

In Next.js with Server-Side Rendering (SSR), components that utilize React Context from rothko-ui require the 'use client' directive. This is because React Context relies on client-side rendering, and it is not supported in SSR.

To ensure that components that depend on React Context from rothko-ui function correctly, you must add the 'use client' directive at the top of the component file. Here’s an example:

```jsx
'use client';

import { Accordion, AccordionPanel } from '@rothko-ui/react';
import MyComponent from './MyComponent';

export default function App() {
  return (
    <Accordion>
      <AccordionPanel label="My Label 1">
        Content 1
      </AddordionPanel>
      <AccordionPanel label="My Label 2">
        Content 2
      </AddordionPanel>
    </Accordion>
  );
}
```

This directive tells Next.js that the component (and its children) should be rendered on the client side, enabling React Context to work as expected.

For more information, visit the official next.js [docs](https://nextjs.org/docs/messages/context-in-server-component).

## Author

@luxo-ai <luxo.ai@proton.me>

Support the project: `0x7A67fF6354d983B6cfc3a7f7C5BA93f73C864b32`

## License

MIT
