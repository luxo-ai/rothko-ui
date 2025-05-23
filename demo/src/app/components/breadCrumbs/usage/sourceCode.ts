export const BASIC = `
import { BreadCrumbItem, BreadCrumbs } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <BreadCrumbs>
        <BreadCrumbItem to="/">Home</BreadCrumbItem>
        <BreadCrumbItem onClick={() => alert('Alert clicked!')}>Alert</BreadCrumbItem>
        <BreadCrumbItem target="_blank" to="https://rothko-ui.com">
          External
        </BreadCrumbItem>
        <BreadCrumbItem>Current</BreadCrumbItem>
      </BreadCrumbs>
    </>
  );
};

export default App;
`;
