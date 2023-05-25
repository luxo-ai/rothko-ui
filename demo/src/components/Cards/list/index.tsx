import { List, ListItem, Typography } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import listCopy from './copy';
import listProps from './props';

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

const ListCard = () => {
  return (
    <Card
      copy={listCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: listProps, description: listCopy.description }}
    >
      <List kind="none">
        <ListItem>
          <Typography.body>One</Typography.body>
        </ListItem>
        <List kind="none">
          <ListItem>
            <Typography.body>One-A</Typography.body>
          </ListItem>
          <ListItem>
            <Typography.body>One-B</Typography.body>
          </ListItem>
          <ListItem>
            <Typography.body>One-C</Typography.body>
          </ListItem>
          <List kind="none">
            <ListItem>
              <Typography.body>One-C-I</Typography.body>
            </ListItem>
            <ListItem>
              <Typography.body>One-C-II</Typography.body>
            </ListItem>
            <ListItem>
              <Typography.body>One-C-III</Typography.body>
            </ListItem>
          </List>
        </List>
        <ListItem>
          <Typography.body>Two</Typography.body>
        </ListItem>
        <ListItem>
          <Typography.body>Three</Typography.body>
        </ListItem>
      </List>
    </Card>
  );
};

export default ListCard;
