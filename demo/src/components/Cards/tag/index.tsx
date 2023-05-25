/* eslint-disable no-console */
import { Tag } from '@rothko-ui/ui';
import React from 'react';

import { CodeLanguage } from '../CodeSnippet';

import Card from '../Card';
import tagCopy from './copy';
import tagProps from './props';

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

const TagCard = () => {
  return (
    <Card
      copy={tagCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: tagProps, description: tagCopy.description }}
    >
      <Tag
        onClose={() => {
          console.log('ayo');
        }}
        appearance="filled"
        kind="success"
      >
        my first tag
      </Tag>
    </Card>
  );
};

export default TagCard;
