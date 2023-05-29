import { Container, MaxWidth, MultiSlider } from '@rothko-ui/ui';
import React, { useReducer, useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import multiSliderCopy from './copy';
import multiSliderProps from './props';
import MultiSliderCustomizations, { customizationsReducer } from './Customizations';
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
      propsMeta={{ meta: multiSliderProps, description: multiSliderCopy.description }}
    >
      <MaxWidth maxW="26rem">
        <MultiSliderCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'} marginTop="2rem">
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
    </Card>
  );
};

export default MultiSliderCard;
