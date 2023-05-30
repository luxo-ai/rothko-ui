import { Container, Slider } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import SliderCustomizations, { customizationsReducer } from './Customizations';
import sliderCopy from './copy';
import sliderProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { Slider } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Slider
      label="Percent"
      kind="primary"
      showValue
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Slider } from '@rothko-ui/ui';

const Example = () => {
  const [value, setValue] = useState(0);

  return (
    <Slider
      label="Percent"
      kind="primary"
      showValue
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};
`,
};

const SliderCard = () => {
  const [value, setValue] = useState(10);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    kind: 'info',
    showValue: true,
    postfix: '%',
    withKind: false,
  });
  const { disabled, kind, postfix, showValue, withKind } = state;
  return (
    <Card
      copy={sliderCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: sliderProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Slider
          label="Percent"
          postfix={postfix}
          kind={withKind ? kind : undefined}
          showValue={showValue}
          disabled={disabled}
          value={value}
          onChange={setValue}
          max={100}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <SliderCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default SliderCard;
