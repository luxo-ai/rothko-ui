import type { Option } from '@rothko-ui/ui';
import { Container, RadioGroup } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import RadioCustomizations, { customizationsReducer } from './Customizations';
import radioCopy from './copy';
import radioProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { RadioGroup, Option } from '@rothko-ui/ui';

const Example: React.FC<ExampleProps> = ({ radioOptions }) => {
  const [selected, setSelected] = useState<string>('');
  const radioOptions: Option<string> = [...]; // Define your options here

  return (
    <RadioGroup
      maxCol={2}
      columnGap="1rem"
      label="Radio Group"
      value={selected}
      onChange={v => setSelected(v)}
      options={radioOptions}
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { RadioGroup } from '@rothko-ui/ui';

const Example = ({ radioOptions }) => {
  const [selected, setSelected] = useState('');
  const radioOptions = [...]; // Define your options here

  return (
    <RadioGroup
      maxCol={2}
      columnGap="1rem"
      label="Radio Group"
      value={selected}
      onChange={v => setSelected(v)}
      options={radioOptions}
    />
  );
};
`,
};

export const radioOptions: Option<number>[] = ['one', 'two', 'three', 'four', 'five'].map(
  (label, id) => ({
    id,
    label,
  })
);

const RadioGroupCard = () => {
  const [selected, setSelected] = useState(1);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    kind: 'primary',
    maxCol: 2,
  });

  const { disabled, kind, maxCol } = state;

  return (
    <Card
      copy={radioCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: radioProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <RadioGroup
          kind={kind}
          disabled={disabled}
          maxCol={maxCol}
          columnGap="1.5rem"
          label="Radio Group"
          value={selected}
          onChange={v => setSelected(v)}
          options={radioOptions}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <RadioCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default RadioGroupCard;
