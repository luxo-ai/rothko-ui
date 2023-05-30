import { BreadCrumbItem, BreadCrumbs } from '@rothko-ui/ui';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import breadCrumbsCopy from './copy';
import breadCrumbsProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

const Example: React.FC = () => {
  return (
    <BreadCrumbs>
      <BreadCrumbItem to="/">Home</BreadCrumbItem>
      <BreadCrumbItem onClick={() => alert('🧸')}>Alert</BreadCrumbItem>
      <BreadCrumbItem target="_blank" to="https://rothko-ui.com">External</BreadCrumbItem>
      <BreadCrumbItem>Last Step</BreadCrumbItem>
    </BreadCrumbs> 
  );
}
`,
  [CodeLanguage.JS]: `
import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

const Example = () => {
  return (
    <BreadCrumbs>
      <BreadCrumbItem to="/">Home</BreadCrumbItem>
      <BreadCrumbItem onClick={() => alert('🧸')}>Alert</BreadCrumbItem>
      <BreadCrumbItem target="_blank" to="https://rothko-ui.com">External</BreadCrumbItem>
      <BreadCrumbItem>Last Step</BreadCrumbItem>
    </BreadCrumbs> 
  );
}
`,
};

const BreadCrumbsCard = () => {
  return (
    <Card
      copy={breadCrumbsCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: breadCrumbsProps }}
    >
      <section>
        <BreadCrumbs>
          <BreadCrumbItem to="/">Home</BreadCrumbItem>
          <BreadCrumbItem onClick={() => alert('🧸')}>Alert</BreadCrumbItem>
          <BreadCrumbItem target="_blank" to="https://rothko-ui.com">
            External
          </BreadCrumbItem>
          <BreadCrumbItem>Last Step</BreadCrumbItem>
        </BreadCrumbs>
      </section>
    </Card>
  );
};

export default BreadCrumbsCard;
