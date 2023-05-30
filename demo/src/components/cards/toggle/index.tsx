import { Container, Flex, Toggle } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';

import { CodeLanguage } from '../CodeExample';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import ToggleCustomizations, { customizationsReducer } from './Customizations';
import toggleCopy from './copy';
import toggleProps from './props';

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
    disabled: false,
  });

  const { kind, withKind, onIcon, offIcon, disabled } = state;
  return (
    <Card
      copy={toggleCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: toggleProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '11rem'}>
        <Flex flexDirection="column" rowGap="1rem">
          <Toggle
            disabled={disabled}
            kind={withKind ? kind : undefined}
            toggled={toggled1}
            onChange={v => setToggled1(v)}
          />
          <Toggle
            disabled={disabled}
            kind={withKind ? kind : undefined}
            toggled={toggled2}
            onChange={v => setToggled2(v)}
          >
            toggle with label
          </Toggle>
        </Flex>
      </Container>
      <Container as="section" maxWidth="26rem">
        <ToggleCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default ToggleCard;
