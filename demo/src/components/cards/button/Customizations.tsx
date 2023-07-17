import type { ButtonAppearance, ButtonShape, RothkoKind, RothkoSize } from '@rothko-ui/ui';
import { Checkbox, Flex, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions, sizeOptions } from '../../rothkoOptions';
import { appearanceOptions, shapeOptions } from './options';

type CutomizationState = {
  alertOnClick: boolean;
  appearance: ButtonAppearance;
  disabled: boolean;
  kind: RothkoKind;
  loading: boolean;
  shape: ButtonShape;
  size: RothkoSize;
};

type CustomizationAction =
  | {
      type: 'CHECK_ALERT_ON_CLICK' | 'CHECK_DISABLED' | 'CHECK_LOADING';
    }
  | { type: 'SET_APPERANCE'; appearance: ButtonAppearance }
  | { type: 'SET_SHAPE'; shape: ButtonShape }
  | { type: 'SET_SIZE'; size: RothkoSize }
  | { type: 'SET_KIND'; kind: RothkoKind };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'CHECK_ALERT_ON_CLICK':
      return { ...state, alertOnClick: !state.alertOnClick };
    case 'CHECK_DISABLED':
      return { ...state, disabled: !state.disabled };
    case 'CHECK_LOADING':
      return { ...state, loading: !state.loading };
    case 'SET_APPERANCE':
      return { ...state, appearance: action.appearance };
    case 'SET_SHAPE':
      return { ...state, shape: action.shape };
    case 'SET_SIZE':
      return { ...state, size: action.size };
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    default:
      return state;
  }
};

type ButtonCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const ButtonCustomizations = ({ state, dispatch }: ButtonCustomizationsProps) => {
  const { appearance, shape, loading, disabled, kind, alertOnClick, size } = state;
  return (
    <AccordionOrBox boxTitleVariant="h3" title="Customizations">
      <Flex
        padding="0.2rem"
        marginBottom="0.3rem"
        flexWrap="wrap-reverse"
        columnGap="10rem"
        rowGap="1.75rem"
      >
        <MaxWidth maxW="10rem">
          <RadioGroup
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="appearance"
            value={appearance}
            onChange={v => dispatch({ type: 'SET_APPERANCE', appearance: v })}
            options={appearanceOptions}
          />
          <RadioGroup
            style={{ marginTop: '1.75rem' }}
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="shape"
            value={shape}
            onChange={v => dispatch({ type: 'SET_SHAPE', shape: v })}
            options={shapeOptions}
          />
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_LOADING' })}
            checked={loading}
            style={{ marginTop: '1.75rem' }}
          >
            loading
          </Checkbox>
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_DISABLED' })}
            checked={disabled}
            style={{ marginTop: '1rem' }}
          >
            disabled
          </Checkbox>
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_ALERT_ON_CLICK' })}
            checked={alertOnClick}
            style={{ marginTop: '1rem' }}
          >
            <Typography.code>{"() => alert('🧸')"}</Typography.code>
          </Checkbox>
        </MaxWidth>
        <MaxWidth maxW="15rem">
          <RadioGroup
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
          />
          <RadioGroup
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="size"
            value={size}
            onChange={v => dispatch({ type: 'SET_SIZE', size: v })}
            options={sizeOptions}
            style={{ marginTop: '1.75rem' }}
          />
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default ButtonCustomizations;
