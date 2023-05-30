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

export const radioOptions: Option<number>[] = ['one', 'two', 'three', 'four', 'five'].map(
  (label, id) => ({
    id,
    label,
  })
);

const RadioCard = () => {
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
      <Container as="section" maxWidth="26rem">
        <RadioCustomizations state={state} dispatch={dispatch} />
      </Container>
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <RadioGroup
          kind={kind}
          disabled={disabled}
          maxCol={maxCol}
          columnGap="1.5rem"
          label="kind"
          value={selected}
          onChange={v => setSelected(v)}
          options={radioOptions}
        />
      </Container>
    </Card>
  );
};

export default RadioCard;
