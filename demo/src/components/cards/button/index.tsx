import type { ButtonAppearance, ButtonShape, RothkoKind, RothkoSize } from '@rothko-ui/ui';
import { Button, MaxWidth } from '@rothko-ui/ui';
import { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import buttonCopy from './copy';
import buttonProps from './props';
import CustomizationsAccordion from './CustomizationsAccordion';
import { useIsMobileOrTablet } from '../../IsMobileOrTabletContext';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { Button } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <Button>Click me</Button>
    );
  }
`,
  [CodeLanguage.JS]: `
  import { Button } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <Button>Click me</Button>
    );
  }
`,
};

const ButtonCard = () => {
  const [appearance, setAppearance] = useState<ButtonAppearance>('filled');
  const [shape, setShape] = useState<ButtonShape>('square');
  const [kind, setKind] = useState<RothkoKind>('primary');
  const [size, setSize] = useState<RothkoSize>('m');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertOnClick, setAlertOnClick] = useState(false);
  const isMobile = useIsMobileOrTablet();

  return (
    <Card
      copy={buttonCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: buttonProps, description: buttonCopy.description }}
    >
      <MaxWidth maxW="55rem">
        is mobile {!isMobile ? 'false' : 'true'}
        <CustomizationsAccordion
          alertOnClick={alertOnClick}
          appearance={appearance}
          disabled={disabled}
          kind={kind}
          loading={loading}
          setAlertOnClick={setAlertOnClick}
          setAppearance={setAppearance}
          setDisabled={setDisabled}
          setKind={setKind}
          setLoading={setLoading}
          setShape={setShape}
          setSize={setSize}
          shape={shape}
          size={size}
        />
      </MaxWidth>
      <MaxWidth maxW="25rem" style={{ marginTop: '1rem' }}>
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
      </MaxWidth>
    </Card>
  );
};

export default ButtonCard;
