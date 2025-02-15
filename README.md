<img src="./assets/logo.png" alt="rothko-ui"/>

# Rothko-UI

Welcome to Rothko-UI, a comprehensive UI component library designed with flexibility and ease of use in mind. This monorepo contains various packages, with `@rothko-ui/react` and `@rothko-ui/icons` being the primary ones for external use.

## Key Packages

- `@rothko-ui/react`: The main package containing all the UI components.
- `@rothko-ui/icons`: A collection of SVG icons optimized for Rothko-UI.

## Using Rothko-UI

### Setup with RothkoProvider

Before using any Rothko-UI components, it's essential to wrap your application or component tree with the `RothkoProvider`. This context provider ensures that all components function correctly and inherit the necessary themes and configurations.

```jsx
import { RothkoProvider } from '@rothko-ui/react';

function MyApp() {
  return <RothkoProvider>{/* Your application components here */}</RothkoProvider>;
}
```

### Basic Component Usage

After setting up the `RothkoProvider`, you can import and use the components:

```jsx
import { Button } from '@rothko-ui/react';

function MyComponent() {
  return <Button>Click Me</Button>;
}
```

### Using Icons

The `@rothko-ui/icons` package provides a range of SVG icons:

```jsx
import { HeartIcon } from '@rothko-ui/icons';

function MyComponent() {
  return <HeartIcon />;
}
```

### Installation

To get started with Rothko-UI:

```bash
npm install @rothko-ui/react @rothko-ui/icons
```

or

```bash
yarn add @rothko-ui/react @rothko-ui/icons
```

## Server-Side Rendering (SSR) with Rothko UI

Rothko UI utilizes `styled-components` for styling its components. If you're integrating Rothko UI into a server-side rendered (SSR) application, it's essential to ensure that the style sheets are correctly generated and sent to the client. This prevents flash-of-unstyled-content (FOUC) issues and ensures a smooth user experience.

### For Next.js Applications:

Next.js is a popular React framework that supports SSR out of the box. If you're using Rothko UI with Next.js, special considerations need to be made for `styled-components`.

To correctly handle `styled-components` with SSR in Next.js:

1. **Install Required Dependencies**:
   Ensure you have both `styled-components` and its Babel plugin installed:

   ```bash
   yarn add styled-components babel-plugin-styled-components
   ```

2. **Configure Babel**:
   Update your `.babelrc` (or `babel.config.json`) to include the `styled-components` plugin:

   ```json
   {
     "presets": ["next/babel"],
     "plugins": [["styled-components", { "ssr": true }]]
   }
   ```

3. **Use `ServerStyleSheet`**:
   In your custom `_document.js` (or `_document.tsx`), use `ServerStyleSheet` from `styled-components` to collect and inline the styles:

   ```jsx
   import Document from 'next/document';
   import { ServerStyleSheet } from 'styled-components';

   export default class MyDocument extends Document {
     static async getInitialProps(ctx) {
       const sheet = new ServerStyleSheet();
       const originalRenderPage = ctx.renderPage;

       try {
         ctx.renderPage = () =>
           originalRenderPage({
             enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
           });

         const initialProps = await Document.getInitialProps(ctx);
         return {
           ...initialProps,
           styles: (
             <>
               {initialProps.styles}
               {sheet.getStyleElement()}
             </>
           ),
         };
       } finally {
         sheet.seal();
       }
     }
   }
   ```

By following these steps, `styled-components` will correctly generate and inline styles during server-side rendering, ensuring that your Rothko UI components are styled appropriately when your Next.js application is loaded.

## Author

@luxo-ai <luxo@rothko-ui.com>

Support the project: `0x7A67fF6354d983B6cfc3a7f7C5BA93f73C864b32`

## License

MIT
