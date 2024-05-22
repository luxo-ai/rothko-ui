import React from 'react';
import { Checkbox, Flex } from '@rothko-ui/ui';

const App = () => {
  return (
    <Flex flexDirection="column" rowGap="1rem">
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled checked>
        Disabled + Checked
      </Checkbox>
    </Flex>
  );
};

export default App;
