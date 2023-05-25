import { Button, Container, Modal, Typography } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import modalCopy from './copy';
import modalProps from './props';
import { ArrowCircleUp } from '@rothko-ui/icons';

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

const ModalCard = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Card
      copy={modalCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: modalProps, description: modalCopy.description }}
    >
      <Container maxWidth="11rem">
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowCircleUp
              style={{ marginRight: '0.5rem' }}
              width={size}
              height={size}
              fill={color}
            />
          )}
          kind="secondary"
          onClick={() => setOpen(true)}
        >
          Open modal
        </Button>
      </Container>
      <Modal title="Testing" isOpen={open} onClose={() => setOpen(false)}>
        <Typography.body>Modal</Typography.body>
      </Modal>
    </Card>
  );
};

export default ModalCard;
