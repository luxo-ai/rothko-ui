import { ArrowRightOutline } from '@rothko-ui/icons';
import { Button, Container, Drawer, Typography } from '@rothko-ui/ui';
import { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import drawerCopy from './copy';
import drawerProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { Button, Drawer, Typography } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        Open Drawer
      </Button>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </Drawer>
    </>
  );
}
`,
  [CodeLanguage.JS]: `
import { Button, Drawer, Typography } from '@rothko-ui/ui';

const Example = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        Open Drawer
      </Button>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </Drawer>
    </>
  );
}
`,
};

const DrawerCard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Card
      copy={drawerCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: drawerProps }}
    >
      <Container maxWidth="11rem">
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowRightOutline width={size} height={size} fill={color} />
          )}
          kind="primary"
          onClick={() => setDrawerOpen(true)}
        >
          Open Drawer
        </Button>
      </Container>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </Drawer>
    </Card>
  );
};

export default DrawerCard;
