import { Button, Container } from '@rothko-ui/ui';
import { useReducer } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import ButtonCustomizations, { customizationsReducer } from './Customizations';
import buttonCopy from './copy';
import buttonProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.JS]: `
import { useState } from 'react';
import { Button } from '@rothko-ui/ui';
    
    
const Example = ({ disabed, onClick }: ExampleProps) => {
  const [loading, setLoading] = useState(false);
    
  const click = () => {
    setLoading(true);
    setTimeout(() => {
      onClick?.();
      setLoading(false);
    }, 1000);
  };
    
  return (
    <Button
      accessoryLeft={({ size }) => <span style={{ width: size, height: 'auto' }}>🧸</span>}
      size="m"
      appearance="filled"
      kind="primary"
      disabled={disabed}
      loading={loading}
      onClick={click}
    >
      Click me
    </Button>
  );
};
`,
  [CodeLanguage.TS]: `
import React from 'react';
import { useState } from 'react';
import { Button } from '@rothko-ui/ui';
  
type ExampleProps = {
  disabed?: boolean;
  onClick?: () => void;
};
  
const Example: React.FC<ExampleProps> = ({ disabed, onClick }) => {
  const [loading, setLoading] = useState<boolean>(false);
  
  const click = () => {
    setLoading(true);
    setTimeout(() => {
      onClick?.();
      setLoading(false);
    }, 1000);
  };
  
  return (
    <Button
      accessoryLeft={({ size }) => <span style={{ width: size, height: 'auto' }}>🧸</span>}
      size="m"
      appearance="filled"
      kind="primary"
      disabled={disabed}
      loading={loading}
      onClick={click}
    >
      Click me
    </Button>
  );
};
`,
};

const ButtonCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    alertOnClick: false,
    appearance: 'filled',
    disabled: false,
    kind: 'primary',
    loading: false,
    shape: 'square',
    size: 'm',
  });

  const { appearance, shape, loading, disabled, kind, alertOnClick, size } = state;

  return (
    <Card
      copy={buttonCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: buttonProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '25rem'}>
        <Button
          kind={kind}
          size={size}
          shape={shape}
          loading={loading}
          appearance={appearance}
          disabled={disabled}
          onClick={alertOnClick ? () => alert('🧸') : undefined}
          style={{ marginBottom: '1rem' }}
        >
          Click me
        </Button>
      </Container>
      <Container as="section" maxWidth="55rem">
        <ButtonCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default ButtonCard;
