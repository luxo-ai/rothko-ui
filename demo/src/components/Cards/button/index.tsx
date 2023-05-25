import type { ButtonAppearance, ButtonShape, Option, RothkoKind, RothkoSize } from '@rothko-ui/ui';
import { AccordionPanel } from '@rothko-ui/ui';
import { Accordion } from '@rothko-ui/ui';
import { Typography } from '@rothko-ui/ui';
import { Button, Checkbox, Container, Flex, FlexItem, MaxWidth, RadioGroup } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import buttonCopy from './copy';
import buttonProps from './props';

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

const sizeOptions: Option<RothkoSize>[] = [
  { id: 'xs', label: 'xs' },
  { id: 's', label: 's' },
  { id: 'm', label: 'm' },
  { id: 'l', label: 'l' },
  { id: 'xl', label: 'xl' },
];

const kindOptions: Option<RothkoKind>[] = [
  { id: 'basic', label: 'basic' },
  { id: 'danger', label: 'danger' },
  { id: 'info', label: 'info' },
  { id: 'primary', label: 'primary' },
  { id: 'secondary', label: 'secondary' },
  { id: 'success', label: 'success' },
  { id: 'warning', label: 'warning' },
];

const appearanceOptions: Option<ButtonAppearance>[] = [
  { id: 'filled', label: 'filled' },
  { id: 'outline', label: 'outline' },
];

const shapeOptions: Option<ButtonShape>[] = [
  { id: 'pill', label: 'pill' },
  { id: 'square', label: 'square' },
];

const ButtonCard = () => {
  const [appearance, setAppearance] = useState<ButtonAppearance>('filled');
  const [shape, setShape] = useState<ButtonShape>('square');
  const [kind, setKind] = useState<RothkoKind>('primary');
  const [size, setSize] = useState<RothkoSize>('m');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertOnClick, setAlertOnClick] = useState(false);

  return (
    <Card
      copy={buttonCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: buttonProps, description: buttonCopy.description }}
    >
      <MaxWidth maxW="55rem">
        <Accordion iconKind="chevron">
          <AccordionPanel open title="Customizations">
            <Flex padding="0.2rem" marginBottom="0.3rem" flexWrap="wrap-reverse" gap="1rem">
              <FlexItem flexShrink={0}>
                <MaxWidth maxW="20rem">
                  <RadioGroup
                    kind="secondary"
                    maxCol={2}
                    columnGap="1.5rem"
                    label="size"
                    value={size}
                    onChange={setSize}
                    options={sizeOptions}
                  />
                  <RadioGroup
                    style={{ marginTop: '1rem' }}
                    kind="secondary"
                    maxCol={2}
                    columnGap="1.5rem"
                    label="appearance"
                    value={appearance}
                    onChange={setAppearance}
                    options={appearanceOptions}
                  />
                  <Checkbox
                    kind="secondary"
                    onChange={setLoading}
                    checked={loading}
                    style={{ marginTop: '1rem' }}
                  >
                    loading
                  </Checkbox>
                  <Checkbox
                    kind="secondary"
                    onChange={setDisabled}
                    checked={disabled}
                    style={{ marginTop: '1rem' }}
                  >
                    disabled
                  </Checkbox>
                  <Checkbox
                    kind="secondary"
                    onChange={setAlertOnClick}
                    checked={alertOnClick}
                    style={{ marginTop: '1rem' }}
                  >
                    <Typography.code>{"() => alert('🧸')"}</Typography.code>
                  </Checkbox>
                </MaxWidth>
              </FlexItem>
              <FlexItem flexShrink={0}>
                <MaxWidth maxW="20rem">
                  <RadioGroup
                    kind="secondary"
                    maxCol={2}
                    columnGap="1.5rem"
                    label="kind"
                    value={kind}
                    onChange={setKind}
                    options={kindOptions}
                  />
                  <RadioGroup
                    style={{ marginTop: '1rem' }}
                    kind="secondary"
                    maxCol={2}
                    columnGap="1.5rem"
                    label="shape"
                    value={shape}
                    onChange={setShape}
                    options={shapeOptions}
                  />
                </MaxWidth>
              </FlexItem>
            </Flex>
          </AccordionPanel>
        </Accordion>
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
