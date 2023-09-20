import { ArrowUpOutline } from '@rothko-ui/icons';
import { Button, Container, Modal } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import ModalCustomizations, { customizationsReducer } from './Customizations';
import modalCopy from './copy';
import modalProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { Button, Modal } from '@rothko-ui/ui';

type ExampleProps {
  title: string;
  body: string;
}

const Example: React.FC<ExampleProps> = ({ title, body }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal size="m" title={title} isOpen={open} onClose={() => setOpen(false)}>
        <p>{body}</p>
      </Modal>
    </>
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Button, Modal } from '@rothko-ui/ui';

const Example = ({ title, body }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal size="m" title={title} isOpen={open} onClose={() => setOpen(false)}>
        <p>{body}</p>
      </Modal>
    </>
  );
};
`,
};

const ModalCard = () => {
  const [open, setOpen] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    size: 'm',
    title: 'Testing',
    body: 'Modal',
  });
  const { size, body, title } = state;
  return (
    <Card
      copy={modalCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: modalProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowUpOutline width={size} height={size} fill={color} />
          )}
          kind="primary"
          onClick={() => setOpen(true)}
        >
          Open modal
        </Button>
      </Container>
      <Modal size={size} title={title} isOpen={open} onClose={() => setOpen(false)}>
        <p>{body}</p>
      </Modal>
      <Container as="section" maxWidth="26rem">
        <ModalCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default ModalCard;
