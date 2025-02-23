import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex, FlexItem } from '@rothko-ui/react';
import { useState } from 'react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import { insertKind } from '../helpers';
import Import from '../Import';
import KindRadioGroup from '../KindRadioGroup';
import Props from '../Props';
import tabBarCopy from './copy';
import { tabProps, tabsProps } from './props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import { BASIC, WITH_KIND } from './usage/sourceCode';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Tabs';

const IMPORT_GLOBAL = "import { Tabs, Tab } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Tabs, Tab } from '@rothko-ui/tabs';";

const TabsCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={tabBarCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
          <KindRadioGroup kind={kind} setKind={setKind} />
        </FlexItem>
      </Flex>
      <Props
        copy={[
          { props: tabsProps, title: 'Tabs Props' },
          { props: tabProps, title: 'Tab Props' },
        ]}
      />
    </Card>
  );
};

export default TabsCard;
