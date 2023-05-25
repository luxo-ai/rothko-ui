import { MultiSlider } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import multiSliderCopy from './copy';
import multiSliderProps from './props';

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

const MultiSliderCard = () => {
  const [value, setValue] = useState<[number, number]>([0, 10]);
  return (
    <div className="white-padded-card">
      <Card
        copy={multiSliderCopy}
        codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
        propsMeta={{ meta: multiSliderProps, description: multiSliderCopy.description }}
      >
        <MultiSlider label="testing" value={value} onChange={v1 => setValue(v1)} max={100} />
      </Card>
    </div>
  );
};

export default MultiSliderCard;
