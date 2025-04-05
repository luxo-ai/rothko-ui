'use client';

import selectCopy from './copy';
import dropdownProps from './props';
import Basic from './usage/Basic';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import MenuVariant from './usage/MenuVariant';
import RenderOption from './usage/RenderOption';
import { BASIC, CLEARABLE, DISABLED, MENU_VARIANT, RENDER_OPTION } from './usage/sourceCode';

import { Card, Import, Props, Usage } from '@/components/card';
import { Container } from '@/components/container';
import Example from '@/components/Example';
import { Flex } from '@/components/flex';
import { useIsMobileOrTablet } from '@/hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Select';

const IMPORT_GLOBAL = "import { Select } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Select } from '@rothko-ui/select';";

const Page = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={selectCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Clearable" sourceCode={CLEARABLE}>
          <Container maxWidth={maxWith}>
            <Clearable />
          </Container>
        </Example>
        <Example title="Menu Variant" sourceCode={MENU_VARIANT}>
          <Container maxWidth={maxWith}>
            <MenuVariant />
          </Container>
        </Example>
        <Example title="Render Option" sourceCode={RENDER_OPTION}>
          <Container maxWidth={maxWith}>
            <RenderOption />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: dropdownProps }} />
    </Card>
  );
};

export default Page;
