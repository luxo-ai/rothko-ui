import type { RothkoKind } from '@rothko-ui/ui';
import { Toggle } from '@rothko-ui/ui';
import { Checkbox, Flex, Input, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  disabled: boolean;
  kind?: RothkoKind;
  postfix?: string;
  showRange: boolean;
  withKind: boolean;
};

type CustomizationAction =
  | { type: 'CHECK_DISABLED' }
  | { type: 'SET_KIND'; kind: RothkoKind }
  | { type: 'SET_POSTFIX'; postfix: string }
  | { type: 'CHECK_SHOW_RANGE' }
  | { type: 'TOGGLE_WITH_KIND' };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'CHECK_DISABLED':
      return { ...state, disabled: !state.disabled };
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    case 'TOGGLE_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    case 'SET_POSTFIX':
      return { ...state, postfix: action.postfix };
    case 'CHECK_SHOW_RANGE':
      return { ...state, showValue: !state.showRange };
    default:
      return state;
  }
};

type MultiSliderCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const MultiSliderCustomizations = ({ state, dispatch }: MultiSliderCustomizationsProps) => {
  const { disabled, kind, showRange: showValue, postfix, withKind } = state;
  return (
    <AccordionOrBox fullWidth boxTitleVariant="h3" title="Customizations">
      <Flex
        padding="0.2rem"
        marginBottom="0.3rem"
        flexWrap="wrap-reverse"
        columnGap="10rem"
        rowGap="1.75rem"
      >
        <MaxWidth maxW="10rem">
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_WITH_KIND' })}
            toggled={withKind}
          >
            with kind
          </Toggle>
          <RadioGroup
            disabled={!withKind}
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="appearance"
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
            style={{ marginTop: '1.5rem' }}
          />
          <Checkbox
            withCheck
            kind="secondary"
            checked={disabled}
            style={{ marginTop: '1rem' }}
            onChange={() => dispatch({ type: 'CHECK_DISABLED' })}
          >
            disabled
          </Checkbox>
          <Checkbox
            withCheck
            kind="secondary"
            checked={showValue}
            style={{ marginTop: '1rem' }}
            onChange={() => dispatch({ type: 'CHECK_SHOW_RANGE' })}
          >
            showRange
          </Checkbox>
        </MaxWidth>
      </Flex>
      <MaxWidth maxW="15rem" style={{ marginTop: '1.5rem' }}>
        <Typography.label>Postfix</Typography.label>
        <Input
          label="postfix"
          value={postfix}
          onChange={e => dispatch({ type: 'SET_POSTFIX', postfix: e.currentTarget.value })}
        />
      </MaxWidth>
    </AccordionOrBox>
  );
};

export default MultiSliderCustomizations;
