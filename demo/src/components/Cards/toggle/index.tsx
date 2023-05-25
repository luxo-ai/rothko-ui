import { Toggle } from '@rothko-ui/ui';
import React, { useState } from 'react';

import { CodeLanguage } from '../CodeExample';

import Card from '../Card';
import toggleCopy from './copy';
import toggleProps from './props';

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

const ToggleCard = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <Card
      copy={toggleCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: toggleProps, description: toggleCopy.description }}
    >
      <Toggle kind="success" toggled={toggled} onChange={v => setToggled(v)} />
    </Card>
  );
};

export default ToggleCard;
