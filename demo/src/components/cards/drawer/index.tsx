import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import drawerCopy from './copy';
import drawerProps from './props';
import Example from '../Example';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import { BASIC, VARIANT } from './usage/sourceCode';
import Variant from './usage/Variant';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Drawer';

const IMPORT_GLOBAL = "import { Drawer } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Drawer } from '@rothko-ui/drawer';";

const DrawerCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';
  return (
    <Card codeUrl={GITHUB_URL} copy={drawerCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWidth}>
            <Basic />
          </Container>
        </Example>
        <Example title="Variant" sourceCode={VARIANT}>
          <Container maxWidth={maxWidth}>
            <Variant />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: drawerProps }} />
    </Card>
  );
};

export default DrawerCard;
