import { Alert } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import alertCopy from './copy';
import alertProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { Alert } from '@rothko-ui/ui';

  type ExampleProps = {
    text: string
  }

  const Example = ({ text }: ExampleProps) => {
      return (
        <Alert>{text}</Alert>
      );
  }
`,
  [CodeLanguage.JS]: `
  import { Alert } from '@rothko-ui/ui';

  const Example = ({ text }) => {
    return <Alert>{text}</Alert>
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
      <section>
        <Alert kind="danger">Error!</Alert>
        <Alert style={{ marginTop: '1.5rem' }} kind="warning">
          Warning
        </Alert>
        <Alert style={{ marginTop: '1.5rem' }} kind="success">
          Success
        </Alert>
      </section>
    </Card>
  );
};

export default AlertCard;
