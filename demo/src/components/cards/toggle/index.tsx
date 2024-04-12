import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem } from '@rothko-ui/ui';

import { BASIC, WITH_ICON, WITH_KIND } from './usage/sourceCode';
import { insertKind } from '../helpers';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import toggleCopy from './copy';
import toggleProps from './props';
import WithIcon from './usage/WithIcon';
import WithKind from './usage/WithKind';
import Usage from '../Usage';
import KindRadioGroup from '../KindRadioGroup';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Toggle';

const IMPORT = "import { Toggle } from '@rothko-ui/ui';";

const ToggleCard = () => {
  const [kind, setKind] = useState<RothkoKind>('primary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={toggleCopy}>
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
        <Example title="With Icon" sourceCode={WITH_ICON}>
          <Container maxWidth={maxWidth}>
            <WithIcon />
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
      <Props copy={{ props: toggleProps }} />
    </Card>
  );
};

export default ToggleCard;
