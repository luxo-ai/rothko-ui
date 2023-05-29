import { Button, Container, MaxWidth, useToaster } from '@rothko-ui/ui';
import { useReducer } from 'react';

import { CodeLanguage } from '../CodeExample';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import ToastCustomizations, { customizationsReducer } from './Customizations';
import toastCopy from './copy';
import toastProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
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
      propsMeta={{ meta: toastProps, description: toastCopy.description }}
    >
      <MaxWidth maxW="26rem">
        <ToastCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '11rem'} marginTop="2rem">
        <Button
          onClick={() =>
            toast.addToast({
              content: 'Hello',
              label: 'Hello world!!!!!!!!',
              kind: withKind ? kind : undefined,
              withLife,
              duration: 5000,
            })
          }
        >
          Click me
        </Button>
      </Container>
    </Card>
  );
};

export default ToastCard;
