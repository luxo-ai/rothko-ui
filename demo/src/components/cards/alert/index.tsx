import { Flex } from '@rothko-ui/react';

import alertCopy from './copy';
import alertProps from './props';
import Card from '../Card';
import Example from '../Example';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import { BASIC, VARIANT } from './usage/sourceCode';
import Variant from './usage/Variant';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Alert';

const IMPORT_GLOBAL = "import { Alert } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Alert } from '@rothko-ui/alert';";

const AlertCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={alertCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
