import { Paragraph } from '@rothko-ui/react';
import React from 'react';

import ErrorPage from '../components/ErrorPage';

const InternalErrorPage = () => (
  <ErrorPage code={500} header="Interna Error">
    <Paragraph>Sorry, something went wrong</Paragraph>
  </ErrorPage>
);

export default InternalErrorPage;
