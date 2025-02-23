import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import modalCopy from './copy';
import modalProps from './props';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Blur from './usage/Blur';
import { BASIC, BLUR } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Modal';

const IMPORT_GLOBAL = "import { Modal } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Modal } from '@rothko-ui/modal';";

const ModalCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '15rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={modalCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
