import { Dropdown } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import multiDropdownCopy from './copy';
import multiDropdownProps from './props';

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

const MultiDropdownCard = () => {
  const [values, setValues] = useState<number[]>([]);
  return (
    <Card
      copy={multiDropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: multiDropdownProps, description: multiDropdownCopy.description }}
    >
      <Dropdown
        multiple
        clearable
        label="Testing"
        value={values}
        onChange={v => setValues(v as number[])}
        options={[
          {
            id: 0,
            label: 'Zero',
          },
          {
            id: 1,
            label: 'One',
          },
          {
            id: 2,
            label: 'Two',
          },
        ]}
      />
    </Card>
  );
};

export default MultiDropdownCard;
