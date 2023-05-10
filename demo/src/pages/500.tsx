import { Typography } from '@rothko-ui/ui';
import DemoError from '../components/DemoError';
import React from 'react';

const InternalErrorPage = () => (
  <DemoError code={500} header="Interna Error">
    <Typography.body>Sorry, something went wrong</Typography.body>
  </DemoError>
);

export default InternalErrorPage;
