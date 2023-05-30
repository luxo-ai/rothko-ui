import { BottomPopup, Button, Container, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import bottomPopupCopy from './copy';
import { CodeLanguage } from '../CodeExample';
import bottomPopupProps from './props';
import { ArrowCircleUp, ArrowUpward } from '@rothko-ui/icons';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import React, { useState } from 'react';
  import { BottomPopup } from '@rothko-ui/ui';

  type ExampleProps = {
    content: string;
  }

  const Example = ({ url }: ExampleProps) => {
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
  import React, { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card
      copy={bottomPopupCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: bottomPopupProps }}
    >
      <Container as="section" maxWidth="11rem">
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowUpward
              style={{ marginRight: '0.5rem' }}
              width={size}
              height={size}
              fill={color}
            />
          )}
          kind="secondary"
          onClick={() => setIsOpen(true)}
        >
          Open popup
        </Button>
      </Container>
      <BottomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </BottomPopup>
    </Card>
  );
};

export default BottomPopupCard;
