import { Paragraph } from '@rothko-ui/components';
import ErrorPage from '../components/ErrorPage';
import React from 'react';

const NotFoundPage = () => (
  <ErrorPage code={404} header="Page Not Found">
    <Paragraph>Sorry, there is nothing to see here</Paragraph>
  </ErrorPage>
);

export default NotFoundPage;
