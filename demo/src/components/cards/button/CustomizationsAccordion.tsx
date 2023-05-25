import type { ButtonAppearance, ButtonShape, RothkoKind, RothkoSize } from '@rothko-ui/ui';
import {
  Accordion,
  AccordionPanel,
  Checkbox,
  Flex,
  FlexItem,
  MaxWidth,
  RadioGroup,
  Typography,
} from '@rothko-ui/ui';
import { appearanceOptions, kindOptions, shapeOptions, sizeOptions } from './options';

type CustomizationsAccordionProps = {
  alertOnClick: boolean;
  appearance: ButtonAppearance;
  disabled: boolean;
  kind: RothkoKind;
  loading: boolean;
  setAlertOnClick: (value: boolean) => void;
  setAppearance: (value: ButtonAppearance) => void;
  setDisabled: (value: boolean) => void;
  setKind: (value: RothkoKind) => void;
  setLoading: (value: boolean) => void;
  setShape: (value: ButtonShape) => void;
  setSize: (value: RothkoSize) => void;
  shape: ButtonShape;
  size: RothkoSize;
};

const CustomizationsAccordion = ({
  alertOnClick,
  appearance,
  disabled,
  kind,
  loading,
  setAlertOnClick,
  setAppearance,
  setDisabled,
  setKind,
  setLoading,
  setShape,
  setSize,
  shape,
  size,
}: CustomizationsAccordionProps) => {
  return (
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
  );
};

export default CustomizationsAccordion;
