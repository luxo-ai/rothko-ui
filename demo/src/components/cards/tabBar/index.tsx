import { MaxWidth, TabBar, Typography } from '@rothko-ui/ui';
import { useReducer } from 'react';
import { CodeLanguage } from '../CodeExample';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import TabBarCustomizations, { customizationsReducer } from './Customizations';
import tabBarCopy from './copy';
import tabBarProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
};

const tabs = [
  { title: 'One', key: 'one', render: () => <Typography.h3>One</Typography.h3> },
  { title: 'Two', key: 'two', render: () => <Typography.h3>Two</Typography.h3> },
  { title: 'Three', key: 'three', render: () => <Typography.h3>Three</Typography.h3> },
] as const;

const TabBarCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    withKind: false,
    kind: 'info',
  });
  const { kind, withKind } = state;
  return (
    <Card
      copy={tabBarCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: tabBarProps, description: tabBarCopy.description }}
    >
      <MaxWidth maxW="26rem">
        <TabBarCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <TabBar kind={withKind ? kind : undefined} tabs={tabs} />
    </Card>
  );
};

export default TabBarCard;
