import { Button, Container, useToaster } from '@rothko-ui/ui';
import React from 'react';

import { CodeLanguage } from '../CodeSnippet';

import Card from '../Card';
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
  return (
    <Card
      copy={toastCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: toastProps, description: toastCopy.description }}
    >
      <Container maxWidth="11rem">
        <Button
          onClick={() =>
            toast.addToast({
              content: 'Hello',
              label: 'Hello world!!!!!!!!',
              withLife: true,
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
