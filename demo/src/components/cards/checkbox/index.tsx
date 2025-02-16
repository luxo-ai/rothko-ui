import { Container, Flex } from '@rothko-ui/react';

import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Card from '../Card';
import checkboxCopy from './copy';
import checkboxProps from './props';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Checkbox';

const IMPORT = "import { Checkbox } from '@rothko-ui/react';";

const CheckboxCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={checkboxCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
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
