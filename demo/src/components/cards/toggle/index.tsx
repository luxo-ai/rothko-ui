import { Container, MaxWidth, Toggle } from '@rothko-ui/ui';
import React, { useReducer, useState } from 'react';

import { CodeLanguage } from '../CodeExample';

import Card from '../Card';
import toggleCopy from './copy';
import toggleProps from './props';
import ToggleCustomizations, { customizationsReducer } from './Customizations';
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

const ToggleCard = () => {
  const [toggled1, setToggled1] = useState<boolean>(false);
  const [toggled2, setToggled2] = useState<boolean>(false);

  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    kind: 'info',
    withKind: false,
  });

  const { kind, withKind, onIcon, offIcon } = state;
  return (
    <Card
      copy={toggleCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: toggleProps, description: toggleCopy.description }}
    >
      <MaxWidth maxW="26rem">
        <ToggleCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '11rem'} marginTop="2rem">
        <Toggle
          kind={withKind ? kind : undefined}
          toggled={toggled1}
          onChange={v => setToggled1(v)}
        />
        <Toggle
          kind={withKind ? kind : undefined}
          toggled={toggled2}
          onChange={v => setToggled2(v)}
        >
          toggle
        </Toggle>
      </Container>
    </Card>
  );
};

export default ToggleCard;
