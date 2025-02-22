import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex, FlexItem } from '@rothko-ui/react';
import { useState } from 'react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import multiSliderCopy from './copy';
import multiSliderProps from './props';
import { insertKind } from '../helpers';
import KindRadioGroup from '../KindRadioGroup';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Slider';

const IMPORT = "import { MultiSlider } from '@rothko-ui/react';";

const MultiSliderCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiSliderCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
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

export default MultiSliderCard;
