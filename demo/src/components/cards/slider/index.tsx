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
      <Container as="section" maxWidth="26rem">
        <SliderCustomizations state={state} dispatch={dispatch} />
      </Container>
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
    </Card>
  );
};

export default SliderCard;
