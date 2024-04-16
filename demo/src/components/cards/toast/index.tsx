import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem } from '@rothko-ui/ui';

import { BASIC, WITH_KIND, WITH_LIFE } from './usage/sourceCode';
import { insertKind } from '../helpers';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import toastCopy from './copy';
import toastProps from './props';
import WithKind from './usage/WithKind';
import WithLife from './usage/WithLife';
import Usage from '../Usage';
import KindRadioGroup from '../KindRadioGroup';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Toaster';

const IMPORT = "import { useToaster } from '@rothko-ui/ui';";

const ToastCard = () => {
  const [kind, setKind] = useState<RothkoKind>('primary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={toastCopy}>
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
