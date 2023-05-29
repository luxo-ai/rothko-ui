import { Container, MaxWidth, Slider } from '@rothko-ui/ui';
import React, { useReducer, useState } from 'react';

import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import sliderCopy from './copy';
import sliderProps from './props';
import SliderCustomizations, { customizationsReducer } from './Customizations';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';

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
      <MaxWidth maxW="26rem">
        <SliderCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'} marginTop="2rem">
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
    </Card>
  );
};

export default SliderCard;
