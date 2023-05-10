import { Typography } from '@rothko-ui/ui';
import DemoError from '../components/DemoError';
import React from 'react';

const NotFoundPage = () => (
  <DemoError code={404} header="Page Not Found">
    <Typography.body>Sorry, there is nothing to see here</Typography.body>
  </DemoError>
);

export default NotFoundPage;
