import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
} from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <Heading1>h1</Heading1>
      <Heading2>h2</Heading2>
      <Heading3>h3</Heading3>
      <Heading4>h4</Heading4>
      <Heading5>h5</Heading5>
      <Heading6>h6</Heading6>
      <Paragraph size="l">paragraph large</Paragraph>
      <Paragraph>paragraph</Paragraph>
      <Paragraph size="s">paragraph small</Paragraph>
      <Paragraph size="xs">paragraph Xsmall</Paragraph>
    </>
  );
};

export default App;
