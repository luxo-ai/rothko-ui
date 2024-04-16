import { Container, Flex } from '@rothko-ui/ui';

import { BASIC } from './usage/sourceCode';
import { TSCode } from '../../Code';
import alertCopy from './copy';
import alertProps from './props';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Alert';

const IMPORT = "import { Alert } from '@rothko-ui/ui';";

const AlertCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={alertCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Basic />
        </Example>
      </Flex>
      <Props copy={{ props: alertProps }} />
    </Card>
  );
};

export default AlertCard;
