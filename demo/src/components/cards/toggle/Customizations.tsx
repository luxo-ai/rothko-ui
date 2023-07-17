import type { RothkoKind } from '@rothko-ui/ui';
import { Checkbox, Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  kind: RothkoKind;
  withKind: boolean;
  disabled: boolean;
};

type CustomizationAction =
  | { type: 'SET_KIND'; kind: RothkoKind }
  | { type: 'TOGGLE_DISABLED' }
  | { type: 'CHECK_WITH_KIND' };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    case 'CHECK_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    case 'TOGGLE_DISABLED':
      return { ...state, disabled: !state.disabled };
    default:
      return state;
  }
};

type ToggleCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const ToggleCustomizations = ({ state, dispatch }: ToggleCustomizationsProps) => {
  const { kind, withKind, disabled } = state;
  return (
    <AccordionOrBox boxTitleVariant="h3" title="Customizations">
      <Flex
        padding="0.2rem"
        marginBottom="0.3rem"
        flexWrap="wrap"
        columnGap="10rem"
        rowGap="1.75rem"
      >
        <MaxWidth maxW="15rem">
          <Checkbox
            kind="secondary"
            withCheck
            onChange={() => dispatch({ type: 'CHECK_WITH_KIND' })}
            checked={withKind}
          >
            with kind
          </Checkbox>
          <RadioGroup
            disabled={!withKind}
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
            style={{ marginTop: '1.5rem' }}
          />
        </MaxWidth>
      </Flex>
      <Toggle
        kind="secondary"
        toggled={disabled}
        onChange={() => dispatch({ type: 'TOGGLE_DISABLED' })}
        style={{ marginTop: '1.5rem' }}
      >
        disabled
      </Toggle>
    </AccordionOrBox>
  );
};

export default ToggleCustomizations;
