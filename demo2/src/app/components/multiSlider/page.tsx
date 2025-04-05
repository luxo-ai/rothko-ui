'use client';

import { insertKind } from '@helpers';
import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex, FlexItem } from '@rothko-ui/react';
import { useState } from 'react';

import multiSliderCopy from './copy';
import multiSliderProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import WithKind from './usage/WithKind';

import { Card, Import, Props, Usage } from '@/components/card';
import Example from '@/components/Example';
import { KindRadioGroup } from '@/components/KindRadioGroup';
import { useIsMobileOrTablet } from '@/hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Slider';

const IMPORT_GLOBAL = "import { MultiSlider, SliderHandle } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { MultiSlider, SliderHandle } from '@rothko-ui/slider';";

const Page = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiSliderCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWidth}>
            <Basic />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWidth}>
            <Disabled />
          </Container>
        </Example>
        <FlexItem>
          <Example title="With Kind" sourceCode={insertKind(WITH_KIND, kind)}>
            <Container maxWidth={maxWidth}>
              <WithKind kind={kind} />
            </Container>
          </Example>
          <KindRadioGroup kind={kind} setKind={setKind} />
        </FlexItem>
      </Flex>
      <Props copy={{ props: multiSliderProps }} />
    </Card>
  );
};

export default Page;
