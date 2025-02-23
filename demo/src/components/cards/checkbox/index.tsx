import { Flex } from '@rothko-ui/react';

import Card from '../Card';
import checkboxCopy from './copy';
import checkboxProps from './props';
import Example from '../Example';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED, WITH_KIND } from './usage/sourceCode';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Checkbox';

const IMPORT_GLOBAL = "import { Checkbox } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Checkbox } from '@rothko-ui/checkbox';";

const CheckboxCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={checkboxCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
