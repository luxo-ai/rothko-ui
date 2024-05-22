import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import Card from '../Card';
import checkboxCopy from './copy';
import checkboxProps from './props';
import Disabled from './usage/Disabled';
import Example from '../Example';
import Props from '../Props';
import WithKind from './usage/WithKind';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Checkbox';

const IMPORT = "import { Checkbox } from '@rothko-ui/ui';";

const CheckboxCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={checkboxCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Basic />
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Disabled />
        </Example>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <WithKind />
        </Example>
      </Flex>
      <Props copy={{ props: checkboxProps }} />
    </Card>
  );
};

export default CheckboxCard;
