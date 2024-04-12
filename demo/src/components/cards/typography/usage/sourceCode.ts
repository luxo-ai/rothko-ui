export const BASIC = `
import React from 'react';

import { Typography } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Typography.h1>h1</Typography.h1>
      <Typography.h2>h2</Typography.h2>
      <Typography.h3>h3</Typography.h3>
      <Typography.h4>h4</Typography.h4>
      <Typography.h5>h5</Typography.h5>
      <Typography.h6>h6</Typography.h6>
      <Typography.body>body</Typography.body>
      <Typography.bodySmall>bodySmall</Typography.bodySmall>
      <Typography.label>LABEL</Typography.label>
      <Typography.caption>caption</Typography.caption>
    </>
  );
};

export default App;
`;
