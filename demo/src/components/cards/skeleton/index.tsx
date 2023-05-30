import { Container, MaxWidth, SkeletonBoxWithLabel, Slider } from '@rothko-ui/ui';
import { useState } from 'react';

import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import skeletonCopy from './copy';
import skeletonProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { SkeletonBoxWithLabel } from '@rothko-ui/ui';

const Example: React.FC = () => {
  return <SkeletonBoxWithLabel speed={2} />;
};
`,
  [CodeLanguage.JS]: `
import React from 'react';
import { SkeletonBoxWithLabel } from '@rothko-ui/ui';

const Example = () => {
  return <SkeletonBoxWithLabel speed={2} />;
};
`,
};

const SkeletonCard = () => {
  const [speed, setSpeed] = useState(1.5);
  return (
    <Card
      copy={skeletonCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: skeletonProps }}
    >
      <Container as="section" maxWidth="18rem">
        <SkeletonBoxWithLabel speed={1 / speed} />
      </Container>
      <MaxWidth as="section" maxW="20rem">
        <Slider label="speed" min={0.1} max={5} value={speed} onChange={v => setSpeed(v)} />
      </MaxWidth>
    </Card>
  );
};

export default SkeletonCard;
