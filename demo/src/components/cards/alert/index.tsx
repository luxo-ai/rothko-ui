import { Alert, Flex } from '@rothko-ui/ui';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import alertCopy from './copy';
import alertProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import React from 'react';
  import { Alert } from '@rothko-ui/ui';

  const Example: React.FC = () => {
    return (
      <>
        <Alert>Error!</Alert>
        <Alert kind="warning">Warning</Alert>
        <Alert kind="success">Success</Alert>
      </>
    );
  }
`,
  [CodeLanguage.JS]: `
  import { Alert } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <>
        <Alert>Error!</Alert>
        <Alert kind="warning">Warning</Alert>
        <Alert kind="success">Success</Alert>
      </>
    );
  }
`,
};

const AlertCard = () => {
  return (
    <Card
      copy={alertCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: alertProps }}
    >
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Alert kind="danger">Error!</Alert>
        <Alert kind="warning">Warning</Alert>
        <Alert kind="success">Success</Alert>
      </Flex>
    </Card>
  );
};

export default AlertCard;
