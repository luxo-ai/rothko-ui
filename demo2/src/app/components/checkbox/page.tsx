'use client';

import checkboxCopy from './copy';
import checkboxProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import WithKind from './usage/WithKind';

import { Card, Import, Props, Usage } from '@/components/card';
import Example from '@/components/Example';
import { Flex } from '@/components/flex';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Checkbox';

const IMPORT_GLOBAL = "import { Checkbox } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Checkbox } from '@rothko-ui/checkbox';";

const Page = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={checkboxCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Basic />
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Disabled />
        </Example>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <WithKind />
        </Example>
      </Flex>
      <Props copy={{ props: checkboxProps }} />
    </Card>
  );
};

export default Page;
