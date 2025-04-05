'use client';

import { Paragraph } from '@rothko-ui/react';
import React from 'react';

import ErrorPage from '@/components/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage code={404} header="Page Not Found">
      <Paragraph>Sorry, there is nothing to see here</Paragraph>
    </ErrorPage>
  );
}
