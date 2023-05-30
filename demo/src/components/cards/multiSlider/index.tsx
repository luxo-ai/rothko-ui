import { Container, MultiSlider } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import MultiSliderCustomizations, { customizationsReducer } from './Customizations';
import multiSliderCopy from './copy';
import multiSliderProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { MultiSlider } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);

  return (
    <MultiSlider
      kind="secondary"
      showRange
      value={value}
      onChange={setValue}
      precision={2}
      min={0}
      max={100}
      orMore
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { MultiSlider } from '@rothko-ui/ui';

const Example = ({ postfix, kind, showRange, disabled }) => {
  const [value, setValue] = useState([0, 50]);

  return (
    <MultiSlider
      kind="secondary"
      showRange
      value={value}
      onChange={setValue}
      precision={2}
      min={0}
      max={100}
      orMore
    />
  );
};
`,
};

const MultiSliderCard = () => {
  const [value, setValue] = useState<[number, number]>([10, 50]);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    kind: 'info',
    showRange: true,
    postfix: ' F',
    withKind: false,
  });
  const { disabled, kind, postfix, showRange, withKind } = state;

  return (
    <Card
      copy={multiSliderCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: multiSliderProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <MultiSlider
          disabled={disabled}
          kind={withKind ? kind : undefined}
          postfix={postfix}
          showRange={showRange}
          label="Temperature"
          value={value}
          onChange={v => setValue(v)}
          precision={1}
          max={100}
          orMore
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <MultiSliderCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default MultiSliderCard;
