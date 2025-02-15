import React from 'react';

import type { RothkoKind } from '@rothko-ui/react';
import { Tabs, Tab } from '@rothko-ui/react';

const App = (props: { kind: RothkoKind }) => {
  return (
    <Tabs kind={props.kind}>
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
