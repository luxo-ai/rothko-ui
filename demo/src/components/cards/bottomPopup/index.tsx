import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, BLUR } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import Blur from './usage/Blur';
import bottomPopupCopy from './copy';
import bottomPopupProps from './props';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Popup';

const IMPORT = "import { BottomPopup } from '@rothko-ui/ui';";

const BottomPopupCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={bottomPopupCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
        <Example title="Blur" sourceCode={BLUR}>
          <Container maxWidth="15rem">
            <Blur />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: bottomPopupProps }} />
    </Card>
  );
};

export default BottomPopupCard;
