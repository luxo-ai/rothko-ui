import { Typography } from '@rothko-ui/ui';
import { JsonCode } from '../../Code';
import Card from '../Card';
import themeCopy from './copy';
import CodeExample from '../CodeExample';
import { CodeLanguage } from '../CodeExample';

const typographyJsonOverride = `{
  "typography": {
    "body": {
      "regular": { "value": '"Helvetica Neue", "Helvetica", Arial, sans-serif' },
      "bold": { "value": "'LabGrotesque-Bold'" },
      "italic": { "value": "'LabGrotesque-Italic'" },
      "light": { "value": "'LabGrotesque-Light'" },
    },
    "header": { "value": "'LabGrotesque-Regular'" },
  },
}`;

const semanticJsonOverride = `{
  "success": {
    "100": { "value": "#f9e0ed" },
    "200": { "value": "#f1b3d9" },
    "300": { "value": "#e585c5" },
    "400": { "value": "#d956b1" },
    "500": { "value": "#cb2ebf" },
    "600": { "value": "#be28ae" },
    "700": { "value": "#af249c" },
    "800": { "value": "#9f1e8a" },
    "900": { "value": "#8d1a77" }
  },
  "info": {
    "100": { "value": "#e0edf9" },
    "200": { "value": "#b3d9f1" },
    "300": { "value": "#85c5e5" },
    "400": { "value": "#56b1d9" },
    "500": { "value": "#2ebfcb" },
    "600": { "value": "#28aebd" },
    "700": { "value": "#249caf" },
    "800": { "value": "#1e8a9f" },
    "900": { "value": "#1a778d" }
  },
  "warning": {
    "100": { "value": "#f9eede" },
    "200": { "value": "#f1dcb3" },
    "300": { "value": "#e9ca85" },
    "400": { "value": "#e0b956" },
    "500": { "value": "#d8a52e" },
    "600": { "value": "#c19828" },
    "700": { "value": "#ab8b24" },
    "800": { "value": "#95801e" },
    "900": { "value": "#7f741a" }
  },
  "danger": {
    "100": { "value": "#f9e0e0" },
    "200": { "value": "#f1b3b3" },
    "300": { "value": "#e58585" },
    "400": { "value": "#d95656" },
    "500": { "value": "#cb2e2e" },
    "600": { "value": "#be2828" },
    "700": { "value": "#af2424" },
    "800": { "value": "#9f1e1e" },
    "900": { "value": "#8d1a1a" }
  },
  "primary": {
    "100": { "value": "#edf2f9" },
    "200": { "value": "#d6e2f4" },
    "300": { "value": "#bdd2ef" },
    "400": { "value": "#a4c2ea" },
    "500": { "value": "#8bb3e5" },
    "600": { "value": "#77a4e0" },
    "700": { "value": "#6494db" },
    "800": { "value": "#4f85d6" },
    "900": { "value": "#3b75d1" }
  },
  "secondary": {
    "100": { "value": "#f2f2f2" },
    "200": { "value": "#e0e0e0" },
    "300": { "value": "#cdcdcd" },
    "400": { "value": "#bababa" },
    "500": { "value": "#a8a8a8" },
    "600": { "value": "#959595" },
    "700": { "value": "#838383" },
    "800": { "value": "#707070" },
    "900": { "value": "#5e5e5e" }
  }
}
`;

const componentJsonOverride = `{
  "background": { "value": "#3a8f7b" },
  "border": { "value": "#b42e3f" },
  "color": { "value": "#8c34a2" },
  "svg": {
    "fill": { "value": "#6d8e1f" },
    "stroke": { "value": "#e59729" }
  },
  "link": { "value": "#4169e1" },
  "slider": {
    "handle": {
      "border": { "value": "#ff6347" },
      "background": { "value": "#f4a460" }
    },
    "range": {
      "background": { "value": "#7fffd4" }
    },
    "track": {
      "background": { "value": "#ffa500" }
    }
  },
  "dropdown": {
    "background": { "value": "#800080" },
    "border_minimal": { "value": "#ff1493" },
    "multiselect": {
      "text": { "value": "#008000" },
      "background": { "value": "#ffff00" }
    },
    "option": {
      "background_selected": { "value": "#87ceeb" }
    }
  },
  "search": {
    "background": { "value": "#da70d6" },
    "option": {
      "background_selected": { "value": "#4682b4" }
    }
  },
  "tabBar": {
    "border": { "value": "#8b0000" }
  },
  "radio": {
    "border": { "value": "#ff8c00" },
    "background": { "value": "#b8860b" },
    "background_selected": { "value": "#dc143c" }
  },
  "table": {
    "header": {
      "background": { "value": "#00bfff" }
    },
    "row": {
      "border": { "value": "#2e8b57" }
    }
  },
  "toast": {
    "color": { "value": "#8b4513" },
    "background": { "value": "#d3d3d3" },
    "life": {
      "filled": { "value": "#9932cc" },
      "empty": { "value": "#ffa07a" }
    }
  },
  "box": {
    "background": { "value": "#00ff7f" },
    "border": { "value": "#696969" }
  },
  "accordion": {
    "border": { "value": "#4b0082" },
    "background": { "value": "#f08080" }
  },
  "checkbox": {
    "background": { "value": "#20b2aa" },
    "background_selected": { "value": "#f08080" }
  },
  "input": {
    "background": { "value": "#8fbc8f" },
    "color": { "value": "#ba55d3" }
  },
  "skeleton": {
    "background": { "value": "#7b68ee" },
    "foreground": { "value": "#00ff00" }
  }
}
`;

const COMPONENT_EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { RothkoProvider } from '@rothko-ui/ui';

const App: React.FC = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          slider: {
            handle: {
              background: { value: '#620a75' },
            },
          },
        },
        light: {
          slider: {
            handle: {
              background: { value: '#f4a460' },
            },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
  [CodeLanguage.JS]: `
import { RothkoProvider } from '@rothko-ui/ui';
  
const App = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          slider: {
            handle: {
              background: { value: '#620a75' },
            },
          },
        },
        light: {
          slider: {
            handle: {
              background: { value: '#f4a460' },
            },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
};

const TYPOGRAPHY_EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { RothkoProvider } from '@rothko-ui/ui';

const App: React.FC = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        typography: {
          body: {
            regular: {
              value: "'Soehne-Buch', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
  [CodeLanguage.JS]: `
import { RothkoProvider } from '@rothko-ui/ui';
  
const App = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        typography: {
          body: {
            regular: {
              value: "'Soehne-Buch', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
};

const SEMANTIC_EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { RothkoProvider } from '@rothko-ui/ui';

const App: React.FC = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          success: {
            500: { value: '#276c27' },
          },
        },
        light: {
          success: {
            500: { value: '#11b811' },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
  [CodeLanguage.JS]: `
import { RothkoProvider } from '@rothko-ui/ui';
  
const App = ({ children }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          success: {
            500: { value: '#276c27' },
          },
        },
        light: {
          success: {
            500: { value: '#11b811' },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  )
}
`,
};

const ThemeCard = () => {
  return (
    <Card copy={themeCopy}>
      <div>
        <Typography.h5>Style overrides</Typography.h5>
        <Typography.body>
          You can easily override specific component styles by targeting their respective keys in
          the theme object. This allows you to fine-tune the appearance and behavior of individual
          components to align with your design vision.
        </Typography.body>
        <Typography.h6 style={{ marginTop: '1.5rem' }}>Overriding Typography</Typography.h6>
        <Typography.body>
          You can overridde the system&apos;s typography using the <code>overrides</code> prop on
          the <code>RothkoProvider</code>.
        </Typography.body>
        <div style={{ marginTop: '1rem' }}>
          <CodeExample examplesLookup={TYPOGRAPHY_EXAMPLE_LOOKUP} />
        </div>
        <Typography.body>All overridable elements</Typography.body>
        <JsonCode code={typographyJsonOverride} />
      </div>
      <div>
        <Typography.h6>Overriding Component Colors</Typography.h6>
        <Typography.body>
          You can overridde the system&apos;s component colorss using the <code>overrides</code>{' '}
          prop on the <code>RothkoProvider</code>.
        </Typography.body>
        <div style={{ marginTop: '1rem' }}>
          <CodeExample examplesLookup={COMPONENT_EXAMPLE_LOOKUP} />
        </div>
        <Typography.body>All overridable elements</Typography.body>
        <JsonCode code={componentJsonOverride} />
      </div>
      <div>
        <Typography.h6>Overriding Semanticc Colors</Typography.h6>
        <Typography.body>
          You can overridde the system&apos;s semantic colorss using the <code>overrides</code> prop
          on the <code>RothkoProvider</code>.
        </Typography.body>
        <div style={{ marginTop: '1rem' }}>
          <CodeExample examplesLookup={SEMANTIC_EXAMPLE_LOOKUP} />
        </div>
        <Typography.body>All overridable elements</Typography.body>
        <JsonCode code={semanticJsonOverride} />
      </div>
    </Card>
  );
};

export default ThemeCard;
