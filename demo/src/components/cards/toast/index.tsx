import { Button, Container, useToaster } from '@rothko-ui/ui';
import { useReducer } from 'react';

import { CodeLanguage } from '../CodeExample';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import ToastCustomizations, { customizationsReducer } from './Customizations';
import toastCopy from './copy';
import toastProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { Button, useToaster, RothkoKind } from '@rothko-ui/ui';

type ExampleProps = {
  kind?: RothkoKind;
}

const Example: React.FC<ExampeProps> = ({ kind }) => {
  const toaster = useToaster();

  const handleClick = () => {
    toaster.addToast({
      content: 'This is a toast message',
      label: 'Alert!',
      kind,
      withLife: true,
      duration: 4000,
    });
  };

  return (
    <Button onClick={handleClick}>
      Click me
    </Button>
  );
};
`,
  [CodeLanguage.JS]: `
import React from 'react';
import { Button, useToaster } from '@rothko-ui/ui';

const Example = ({ kind }) => {
  const toaster = useToaster();

  const handleClick = () => {
    toaster.addToast({
      content: 'This is a toast message',
      label: 'Alert!',
      kind,
      withLife: true,
      duration: 4000,
    });
  };

  return (
    <Button onClick={handleClick}>
      Click me
    </Button>
  );
};
`,
};

const ToastCard = () => {
  const toast = useToaster();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    kind: 'info',
    withLife: false,
    withKind: false,
  });
  const { kind, withKind, withLife } = state;
  return (
    <Card
      copy={toastCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{
        meta: toastProps,
        titleOveride: 'Hook Args',
      }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '11rem'}>
        <Button
          onClick={() =>
            toast.addToast({
              content: 'This is a toast message',
              label: 'Alert!',
              kind: withKind ? kind : undefined,
              withLife,
              duration: 4000,
            })
          }
        >
          Click me
        </Button>
      </Container>
      <Container as="section" maxWidth="26rem">
        <ToastCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default ToastCard;
