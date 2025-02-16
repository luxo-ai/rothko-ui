import { Paragraph } from '@rothko-ui/react';
import React from 'react';

import ErrorPage from '../components/ErrorPage';

const NotFoundPage = () => (
  <ErrorPage code={404} header="Page Not Found">
    <Paragraph>Sorry, there is nothing to see here</Paragraph>
  </ErrorPage>
);

export default NotFoundPage;
