import { Container, Flex, Toggle } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';

import { CodeLanguage } from '../CodeExample';

import { Video, VideoOff } from '@rothko-ui/icons';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import ToggleCustomizations, { customizationsReducer } from './Customizations';
import toggleCopy from './copy';
import toggleProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { Toggle, RothkoKind } from '@rothko-ui/ui';
import { Video, VideoOff } from '@rothko-ui/icons';

type ExampleProps = {
  kind?: RothkoKind;
}

const Example: React.FC<ExampleProps> = ({ kind }) => {
  const [toggled, setToggled] = useState<boolean>(false);

  const handleChange = (t: boolean) => {
    setToggled(t);
  };

  return (
    <Toggle
      onIcon={<Video fill="#000" />}
      offIcon={<VideoOff fill="#000" />}
      kind={kind}
      toggled={toggled}
      onChange={handleChange}
    >
      example
    </Toggle>
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Toggle } from '@rothko-ui/ui';
import { Video, VideoOff } from '@rothko-ui/icons';

const Example = ({ kind }) => {
  const [toggled, setToggled] = useState(false);

  const handleChange = (t) => {
    setToggled(t);
  };

  return (
    <Toggle
      onIcon={<Video fill="#000" />}
      offIcon={<VideoOff fill="#000" />} 
      kind={kind}
      toggled={toggled}
      onChange={handleChange}
    >
      example
    </Toggle>
  );
};
`,
};

const ToggleCard = () => {
  const [toggled1, setToggled1] = useState<boolean>(false);
  const [toggled2, setToggled2] = useState<boolean>(false);
  const [toggled3, setToggled3] = useState<boolean>(false);

  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    kind: 'info',
    withKind: false,
    disabled: false,
  });

  const { kind, withKind, disabled } = state;
  return (
    <Card
      copy={toggleCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: toggleProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '15rem'}>
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
            style={{ marginTop: '0.5rem' }}
          >
            toggle with label
          </Toggle>
          <Toggle
            onIcon={<Video fill="#000" />}
            offIcon={<VideoOff fill="#000" />}
            disabled={disabled}
            kind={withKind ? kind : undefined}
            toggled={toggled3}
            onChange={v => setToggled3(v)}
            style={{ marginTop: '0.5rem' }}
          >
            toggle with on/off icons
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
