import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex, FlexItem } from '@rothko-ui/react';
import { useState } from 'react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import { insertKind } from '../helpers';
import Props from '../Props';
import toastCopy from './copy';
import toastProps from './props';
import Basic from './usage/Basic';
import { BASIC, WITH_KIND, WITH_LIFE } from './usage/sourceCode';
import WithKind from './usage/WithKind';
import { TSCode } from '../../Code';
import KindRadioGroup from '../KindRadioGroup';
import Usage from '../Usage';
import WithLife from './usage/WithLife';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Toaster';

const IMPORT = "import { useToaster } from '@rothko-ui/react';";

const ToastCard = () => {
  const [kind, setKind] = useState<RothkoKind>('danger');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={toastCopy}>
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
        <Example title="With Life" sourceCode={WITH_LIFE}>
          <Container maxWidth={maxWidth}>
            <WithLife />
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
      <Props copy={{ props: toastProps, title: 'Hook Args' }} />
    </Card>
  );
};

export default ToastCard;
