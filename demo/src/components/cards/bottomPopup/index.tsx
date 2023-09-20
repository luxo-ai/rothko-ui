import { ArrowUpOutline } from '@rothko-ui/icons';
import { BottomPopup, Button, Container, Typography } from '@rothko-ui/ui';
import { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import bottomPopupCopy from './copy';
import bottomPopupProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import React, { useState } from 'react';
  import { BottomPopup } from '@rothko-ui/ui';

  type ExampleProps = {
    content: string;
  }

  const Example: React.FC<ExampleProps> = ({ url }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open popup</button>
        <BottomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {content}
        </BottomPopup>
      </> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { useState } from 'react';
  import { BottomPopup } from '@rothko-ui/ui';

  const Example = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open popup</button>
        <BottomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {content}
        </BottomPopup>
      </>
    ) 
  }
`,
};

const BottomPopupCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      copy={bottomPopupCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: bottomPopupProps }}
    >
      <Container as="section" maxWidth="11rem">
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowUpOutline width={size} height={size} fill={color} />
          )}
          onClick={() => setOpen(true)}
        >
          Open popup
        </Button>
      </Container>
      <BottomPopup open={open} onClose={() => setOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </BottomPopup>
    </Card>
  );
};

export default BottomPopupCard;
