import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem, RadioGroup, Typography } from '@rothko-ui/ui';

import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import { kindOptions } from '../../rothkoOptions';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Disabled from './usage/Disabled';
import Example from '../Example';
import Props from '../Props';
import sliderCopy from './copy';
import sliderProps from './props';
import WithKind from './usage/WithKind';
import { insertKind } from '../helpers';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Slider';

const IMPORT = "import { Slider } from '@rothko-ui/ui';";

const SliderCard = () => {
  const [kind, setKind] = useState<RothkoKind>('primary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={sliderCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode code={IMPORT} />
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
          <RadioGroup
            kind="secondary"
            maxCol={3}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={k => setKind(k)}
            options={kindOptions}
            style={{ maxWidth: '25rem' }}
          />
        </FlexItem>
      </Flex>
      <Props copy={{ props: sliderProps }} />
    </Card>
  );
};

export default SliderCard;
