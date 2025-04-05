export const BASIC = `
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
`;
export const WITH_KIND = `
import { Tabs, Tab } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tabs kind="info">
      <Tab title="One" $key="one">
        {/** Screen one */}
      </Tab>
      <Tab title="Two" $key="two">
        {/** Screen two */}
      </Tab>
    </Tabs>
  );
};

export default App;
`;
