import { Input } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import inputCopy from './copy';

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

const InputCard = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Card copy={inputCopy} codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}>
      <section>
        <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
      </section>
    </Card>
  );
};

export default InputCard;
