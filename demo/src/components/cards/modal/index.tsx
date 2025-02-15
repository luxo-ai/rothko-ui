import { Container, Flex } from '@rothko-ui/react';

import { BASIC, BLUR } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Blur from './usage/Blur';
import Card from '../Card';
import Example from '../Example';
import modalCopy from './copy';
import modalProps from './props';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Modal';

const IMPORT = "import { Modal } from '@rothko-ui/react';";

const ModalCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '15rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={modalCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Blur" sourceCode={BLUR}>
          <Container maxWidth={maxWith}>
            <Blur />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: modalProps }} />
    </Card>
  );
};

export default ModalCard;
