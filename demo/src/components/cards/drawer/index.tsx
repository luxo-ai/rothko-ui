import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import drawerCopy from './copy';
import drawerProps from './props';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Blur from './usage/Blur';
import { BASIC, BLUR } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Drawer';

const IMPORT = "import { Drawer } from '@rothko-ui/react';";

const DrawerCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';
  return (
    <Card codeUrl={GITHUB_URL} copy={drawerCopy}>
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
        <Example title="Blur" sourceCode={BLUR}>
          <Container maxWidth={maxWidth}>
            <Blur />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: drawerProps }} />
    </Card>
  );
};

export default DrawerCard;
