import { Container, Flex } from '@rothko-ui/react';

import { BASIC, VARIANT } from './usage/sourceCode';
import { TSCode } from '../../Code';
import alertCopy from './copy';
import alertProps from './props';
import Basic from './usage/Basic';
import Variant from './usage/Variant';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Alert';

const IMPORT = "import { Alert } from '@rothko-ui/react';";

const AlertCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={alertCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Basic />
        </Example>
        <Example title="Variant" sourceCode={VARIANT}>
          <Variant />
        </Example>
      </Flex>
      <Props copy={{ props: alertProps }} />
    </Card>
  );
};

export default AlertCard;
