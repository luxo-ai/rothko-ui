import { Tabs, Tab } from '@rothko-ui/react';
import React from 'react';

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
