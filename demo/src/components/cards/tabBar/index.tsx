import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem, RadioGroup } from '@rothko-ui/ui';

import { BASIC, WITH_KIND } from './usage/sourceCode';
import { insertKind } from '../helpers';
import { kindOptions } from '../../rothkoOptions';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import tabBarCopy from './copy';
import tabBarProps from './props';
import WithKind from './usage/WithKind';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/TabBar';

const IMPORT = "import { TabBar } from '@rothko-ui/ui';";

const TabBarCard = () => {
  const [kind, setKind] = useState<RothkoKind>('primary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={tabBarCopy}>
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
      <Props copy={{ props: tabBarProps }} />
    </Card>
  );
};

export default TabBarCard;
