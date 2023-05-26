import type { ButtonAppearance, ButtonShape, RothkoKind, RothkoSize } from '@rothko-ui/ui';
import { Checkbox, Flex, FlexItem, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
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
    <AccordionOrBox boxTitleVariant="h3" title="Customizations">
      <Flex
        padding="0.2rem"
        marginBottom="0.3rem"
        flexWrap="wrap-reverse"
        columnGap="10rem"
        rowGap="1.75rem"
      >
        <div>
          <MaxWidth maxW="10rem">
            <RadioGroup
              kind="secondary"
              maxCol={2}
              columnGap="1.5rem"
              label="appearance"
              value={appearance}
              onChange={setAppearance}
              options={appearanceOptions}
            />
            <RadioGroup
              style={{ marginTop: '1.75rem' }}
              kind="secondary"
              maxCol={2}
              columnGap="1.5rem"
              label="shape"
              value={shape}
              onChange={setShape}
              options={shapeOptions}
            />
            <Checkbox
              kind="secondary"
              onChange={setLoading}
              checked={loading}
              style={{ marginTop: '1.75rem' }}
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
        </div>
        <div>
          <MaxWidth maxW="15rem">
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
              kind="secondary"
              maxCol={2}
              columnGap="1.5rem"
              label="size"
              value={size}
              onChange={setSize}
              options={sizeOptions}
              style={{ marginTop: '1.75rem' }}
            />
          </MaxWidth>
        </div>
      </Flex>
    </AccordionOrBox>
  );
};

export default CustomizationsAccordion;
