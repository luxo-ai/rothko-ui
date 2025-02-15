import { Paragraph } from '@rothko-ui/react';
import ErrorPage from '../components/ErrorPage';
import React from 'react';

const InternalErrorPage = () => (
  <ErrorPage code={500} header="Interna Error">
    <Paragraph>Sorry, something went wrong</Paragraph>
  </ErrorPage>
);

export default InternalErrorPage;
