import React from 'react';

import { Tabs, Tab } from '@rothko-ui/components';

const App = () => {
  return (
    <Tabs>
      <Tab title="One" $key="one">
        {/** Screen One */}
      </Tab>
      <Tab title="Two" $key="two">
        {/** Screen Two */}
      </Tab>
    </Tabs>
  );
};

export default App;
