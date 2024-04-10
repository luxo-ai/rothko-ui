import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem, RadioGroup } from '@rothko-ui/ui';
import { useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import multiSliderCopy from './copy';
import multiSliderProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import WithKind from './usage/WithKind';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import { kindOptions } from '../../rothkoOptions';
import Props from '../Props';
import { insertKind } from '../helpers';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Slider';

const IMPORT = "import { MultiSlider } from '@rothko-ui/ui';";

const MultiSliderCard = () => {
  const [kind, setKind] = useState<RothkoKind>('primary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiSliderCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
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
      <Props copy={{ props: multiSliderProps }} />
    </Card>
  );
};

export default MultiSliderCard;
