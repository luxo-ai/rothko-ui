import { Container, Flex, Typography } from '@rothko-ui/ui';

import { BASIC } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import Card from '../Card';
import drawerCopy from './copy';
import drawerProps from './props';
import Example from '../Example';
import Props from '../Props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Drawer';

const IMPORT = "import { Drawer } from '@rothko-ui/ui';";

const DrawerCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={drawerCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode code={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: drawerProps }} />
    </Card>
  );
};

export default DrawerCard;
