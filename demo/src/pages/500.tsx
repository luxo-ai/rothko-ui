import { Typography } from '@rothko-ui/ui';
import ErrorPage from '../components/ErrorPage';
import React from 'react';

const InternalErrorPage = () => (
  <ErrorPage code={500} header="Interna Error">
    <Typography.body>Sorry, something went wrong</Typography.body>
  </ErrorPage>
);

export default InternalErrorPage;
