import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import inputCopy from './copy';
import Props from '../Props';
import Usage from '../Usage';
import styles from './Input.module.scss';
import inputProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Input';

const IMPORT = "import { Input } from '@rothko-ui/react';";

const InputCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={inputCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container className={styles['input-container']} maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container className={styles['input-container']} maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: inputProps }} />
    </Card>
  );
};

export default InputCard;
