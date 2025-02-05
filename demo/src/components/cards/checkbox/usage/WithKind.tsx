import React, { useState } from 'react';
import { Checkbox, Flex } from '@rothko-ui/components';

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
