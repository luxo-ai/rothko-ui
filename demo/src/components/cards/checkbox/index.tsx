import { Checkbox, Container, MaxWidth } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import CheckboxCustomizations, { customizationsReducer } from './Customizations';
import checkboxCopy from './copy';
import checkboxProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
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
    withCheck: false,
    disabled: false,
  });

  const { kind, withKind, withCheck, disabled } = state;
  return (
    <Card
      copy={checkboxCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: checkboxProps }}
    >
      <MaxWidth maxW="55rem">
        <CheckboxCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '25rem'} marginTop="1rem">
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
          Hello world
        </Checkbox>
      </Container>
    </Card>
  );
};

export default CheckboxCard;
