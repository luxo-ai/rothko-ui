import { Bell } from '@rothko-ui/icons';
import { Notification } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import notificationCopy from './copy';
import notificationProps from './props';
import { CodeLanguage } from '../CodeSnippet';

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

const NotificationCard = () => {
  return (
    <Card
      copy={notificationCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: notificationProps, description: notificationCopy.description }}
    >
      <Notification color="success" size={10} count={400} maxCount={40}>
        <Bell width={24} height={24} />
      </Notification>
    </Card>
  );
};

export default NotificationCard;
