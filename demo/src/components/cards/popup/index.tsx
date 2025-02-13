import { Container, Flex } from '@rothko-ui/components';

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
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Popup';

const IMPORT = "import { BottomPopup } from '@rothko-ui/components';";

const PopupCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';
  return (
    <Card codeUrl={GITHUB_URL} copy={bottomPopupCopy}>
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
      <Props copy={{ props: bottomPopupProps }} />
    </Card>
  );
};

export default PopupCard;
