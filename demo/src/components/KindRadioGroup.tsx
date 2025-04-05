import type { RothkoKind } from '@rothko-ui/react';
import { Radio, RadioGroup } from '@rothko-ui/react';

import { rothkoKinds } from './constants';

type KindRadioProps = {
  kind: RothkoKind;
  setKind: (kind: RothkoKind) => void;
};

export const KindRadioGroup = ({ kind, setKind }: KindRadioProps) => {
  return (
    <RadioGroup
      maxCol={3}
      columnGap="1.5rem"
      label="kind"
      value={kind}
      onChange={k => setKind(k)}
      style={{ maxWidth: '25rem' }}
    >
      {rothkoKinds.map(k => (
        <Radio $key={k} key={k}>
          {k}
        </Radio>
      ))}
    </RadioGroup>
  );
};
