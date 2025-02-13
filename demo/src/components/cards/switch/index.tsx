import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/components';
import { Container, Flex, FlexItem } from '@rothko-ui/components';

import { BASIC, DISABLED, WITH_ICON, WITH_KIND } from './usage/sourceCode';
import { insertKind } from '../helpers';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Disabed from './usage/Disabled';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import switchCopy from './copy';
import switchProps from './props';
import WithIcon from './usage/WithIcon';
import WithKind from './usage/WithKind';
import Usage from '../Usage';
import KindRadioGroup from '../KindRadioGroup';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Switch';

const IMPORT = "import { Switch } from '@rothko-ui/components';";

const SwitchCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={switchCopy}>
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
        <Example title="With Icon" sourceCode={WITH_ICON}>
          <Container maxWidth={maxWidth}>
            <WithIcon />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWidth}>
            <Disabed />
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
      <Props copy={{ props: switchProps }} />
    </Card>
  );
};

export default SwitchCard;
