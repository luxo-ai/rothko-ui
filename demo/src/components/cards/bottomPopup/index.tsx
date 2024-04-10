import { Container, Flex, Typography } from '@rothko-ui/ui';

import { BASIC } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import bottomPopupCopy from './copy';
import bottomPopupProps from './props';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Popup';

const IMPORT = "import { BottomPopup } from '@rothko-ui/ui';";

const BottomPopupCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={bottomPopupCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: bottomPopupProps }} />
    </Card>
  );
};

export default BottomPopupCard;
