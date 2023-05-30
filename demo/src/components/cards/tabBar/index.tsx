import { Container, TabBar, Typography } from '@rothko-ui/ui';
import { useReducer } from 'react';
import { CodeLanguage } from '../CodeExample';

import Card from '../Card';
import TabBarCustomizations, { customizationsReducer } from './Customizations';
import tabBarCopy from './copy';
import tabBarProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { TabBar, Typography } from '@rothko-ui/ui';

const tabs = [
  { 
    title: 'One',
    key: 'one',
    render: () => <>{/* Screen one */}</> 
  },
  { 
    title: 'Two',
    key: 'two', 
    render: () => <>{/* Screen two */}</> 
  },
] as const;

const Example: React.FC = () => {
  return <TabBar tabs={tabs} />
}
`,
  [CodeLanguage.JS]: `
import React from 'react';
import { TabBar, Typography } from '@rothko-ui/ui';

const tabs = [
  { 
    title: 'One',
    key: 'one',
    render: () => <>{/* Screen one */}</> 
  },
  { 
    title: 'Two', 
    key: 'two', 
    render: () => <>{/* Screen two */}</>  
  },
];

const Example = () => {
  return <TabBar tabs={tabs} />
}
`,
};

const tabs = [
  { title: 'One', key: 'one', render: () => <Typography.h3>One</Typography.h3> },
  { title: 'Two', key: 'two', render: () => <Typography.h3>Two</Typography.h3> },
  { title: 'Three', key: 'three', render: () => <Typography.h3>Three</Typography.h3> },
] as const;

const TabBarCard = () => {
  const [state, dispatch] = useReducer(customizationsReducer, {
    withKind: false,
    kind: 'info',
  });
  const { kind, withKind } = state;
  return (
    <Card
      copy={tabBarCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: tabBarProps }}
    >
      <section>
        <TabBar kind={withKind ? kind : undefined} tabs={tabs} />
      </section>
      <Container as="section" maxWidth="26rem">
        <TabBarCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default TabBarCard;
