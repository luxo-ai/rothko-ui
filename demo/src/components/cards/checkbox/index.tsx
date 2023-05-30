import { Checkbox, Container } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import CheckboxCustomizations, { customizationsReducer } from './Customizations';
import checkboxCopy from './copy';
import checkboxProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { Checkbox } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  
  return (
    <Checkbox
      kind="primary"
      withCheck
      checked={checked}
      onChange={v => setChecked(v)}
    >
      example
    </Checkbox>
  );
}
`,
  [CodeLanguage.JS]: `
import { Checkbox } from '@rothko-ui/ui';

const Example = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox
      kind="primary"
      checked={checked}
      onChange={v => setChecked(v)}
    >
      example
    </Checkbox>
  );
}
`,
};

const CheckboxCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    kind: 'info',
    withKind: false,
    withCheck: true,
    disabled: false,
  });

  const { kind, withKind, withCheck, disabled } = state;
  return (
    <Card
      copy={checkboxCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: checkboxProps }}
    >
      <Container maxWidth={isMobileOrTablet ? undefined : '25rem'}>
        <Checkbox
          disabled={disabled}
          kind={withKind ? kind : undefined}
          style={{ marginBottom: 18 }}
          checked={checked1}
          withCheck={withCheck}
          onChange={v => setChecked1(v)}
        />
        <Checkbox
          disabled={disabled}
          kind={withKind ? kind : undefined}
          withCheck={withCheck}
          checked={checked2}
          onChange={v => setChecked2(v)}
        >
          checkbox with label
        </Checkbox>
      </Container>
      <Container as="section" maxWidth="55rem">
        <CheckboxCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default CheckboxCard;
