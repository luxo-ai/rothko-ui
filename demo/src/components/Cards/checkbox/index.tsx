import { Checkbox } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import checkboxCopy from './copy';
import checkboxProps from './props';

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

const CheckboxCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <Card
      copy={checkboxCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: checkboxProps, description: checkboxCopy.description }}
    >
      <Checkbox style={{ marginBottom: 18 }} checked={checked1} onChange={v => setChecked1(v)} />
      <Checkbox withCheck kind="info" checked={checked2} onChange={v => setChecked2(v)}>
        Hello world
      </Checkbox>
    </Card>
  );
};

export default CheckboxCard;
