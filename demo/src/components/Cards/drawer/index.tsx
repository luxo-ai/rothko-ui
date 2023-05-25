import { Button, Container, Drawer, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import drawerCopy from './copy';
import drawerProps from './props';
import { ArrowCircleRight } from '@rothko-ui/icons';

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

const DrawerCard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Card
      copy={drawerCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: drawerProps, description: drawerCopy.description }}
    >
      <Container maxWidth="11rem">
        <Button
          accessoryLeft={({ size, color }) => (
            <ArrowCircleRight
              style={{ marginRight: '0.5rem' }}
              width={size}
              height={size}
              fill={color}
            />
          )}
          kind="secondary"
          onClick={() => setDrawerOpen(true)}
        >
          Open Drawer
        </Button>
      </Container>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </Drawer>
    </Card>
  );
};

export default DrawerCard;
