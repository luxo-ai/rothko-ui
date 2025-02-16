import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex, FlexItem } from '@rothko-ui/react';
import { useState } from 'react';

import sliderCopy from './copy';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import sliderProps from './props';
import { insertKind } from '../helpers';
import Usage from '../Usage';
import Basic from './usage/Basic';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import { TSCode } from '../../Code';
import KindRadioGroup from '../KindRadioGroup';
import Disabled from './usage/Disabled';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Slider';

const IMPORT = "import { Slider } from '@rothko-ui/react';";

const SliderCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={sliderCopy}>
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
      <Props copy={{ props: sliderProps }} />
    </Card>
  );
};

export default SliderCard;
