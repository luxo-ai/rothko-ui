export const BASIC = `
import React, { useState } from 'react';
import { Checkbox, Flex } from '@rothko-ui/ui';

const App = () => {
  const [withoutLabelChecked, setWithoutLabelChecked] = useState(true);
  const [withLabelChecked, setWithLabelChecked] = useState(true);

  return (
    <Flex flexDirection="column" rowGap="1rem">
      <Checkbox checked={withoutLabelChecked} onChange={v => setWithoutLabelChecked(v)} />
      <Checkbox checked={withLabelChecked} onChange={v => setWithLabelChecked(v)}>
        Label
      </Checkbox>
    </Flex>
  );
};

export default App;
`;
export const DISABLED = `
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
`;
export const WITH_KIND = `
import React, { useState } from 'react';
import { Checkbox, Flex } from '@rothko-ui/ui';

const App = () => {
  const [primaryChecked, setPrimaryChecked] = useState(true);
  const [secondaryChecked, setSecondaryChecked] = useState(true);
  const [successChecked, setSuccessChecked] = useState(true);
  const [warningChecked, setWarningChecked] = useState(true);
  const [dangerChecked, setDangerChecked] = useState(true);
  const [infoChecked, setInfoChecked] = useState(true);

  return (
    <Flex flexDirection="column" rowGap="1rem">
      <Checkbox checked={primaryChecked} onChange={v => setPrimaryChecked(v)} kind="primary">
        Primary
      </Checkbox>
      <Checkbox checked={secondaryChecked} onChange={v => setSecondaryChecked(v)} kind="secondary">
        Secondary
      </Checkbox>
      <Checkbox checked={successChecked} onChange={v => setSuccessChecked(v)} kind="success">
        Success
      </Checkbox>
      <Checkbox checked={warningChecked} onChange={v => setWarningChecked(v)} kind="warning">
        Warning
      </Checkbox>
      <Checkbox checked={dangerChecked} onChange={v => setDangerChecked(v)} kind="danger">
        Danger
      </Checkbox>
      <Checkbox checked={infoChecked} onChange={v => setInfoChecked(v)} kind="info">
        Info
      </Checkbox>
    </Flex>
  );
};

export default App;
`;
