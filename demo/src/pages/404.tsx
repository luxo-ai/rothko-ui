import { Typography } from '@rothko-ui/ui';
import ErrorPage from '../components/ErrorPage';
import React from 'react';

const NotFoundPage = () => (
  <ErrorPage code={404} header="Page Not Found">
    <Typography.body>Sorry, there is nothing to see here</Typography.body>
  </ErrorPage>
);

export default NotFoundPage;
