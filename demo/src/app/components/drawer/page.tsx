'use client';

import drawerCopy from './copy';
import drawerProps from './props';
import Basic from './usage/Basic';
import { BASIC, VARIANT } from './usage/sourceCode';
import Variant from './usage/Variant';

import { Card, Import, Props, Usage } from '@/components/card';
import { Container } from '@/components/container';
import Example from '@/components/Example';
import { Flex } from '@/components/flex';
import { useIsMobileOrTablet } from '@/hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Drawer';

const IMPORT_GLOBAL = "import { Drawer } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Drawer } from '@rothko-ui/drawer';";

const Page = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';
  return (
    <Card codeUrl={GITHUB_URL} copy={drawerCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWidth}>
            <Basic />
          </Container>
        </Example>
        <Example title="Variant" sourceCode={VARIANT}>
          <Container maxWidth={maxWidth}>
            <Variant />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: drawerProps }} />
    </Card>
  );
};

export default Page;
