import type { RothkoKind } from '@rothko-ui/ui';
import { Dropdown } from '@rothko-ui/ui';
import { Slider } from '@rothko-ui/ui';
import { Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  maxCol: number;
  kind: RothkoKind;
  disabled: boolean;
};

type CustomizationAction =
  | { type: 'SET_KIND'; kind: RothkoKind }
  | { type: 'SET_MAX_COL'; maxCol: number }
  | { type: 'TOGGLE_DISABLED' };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    case 'SET_MAX_COL':
      return { ...state, maxCol: action.maxCol };
    case 'TOGGLE_DISABLED':
      return { ...state, disabled: !state.disabled };
    default:
      return state;
  }
};

type RadioCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const RadioCustomizations = ({ state, dispatch }: RadioCustomizationsProps) => {
  const { kind, disabled, maxCol } = state;
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
          <RadioGroup
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
          />
        </MaxWidth>
        <MaxWidth maxW="10rem">
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_DISABLED' })}
            toggled={disabled}
          >
            disabled
          </Toggle>
        </MaxWidth>
      </Flex>
      <MaxWidth maxW="10rem" style={{ marginTop: '1.5rem' }}>
        <Dropdown
          label="maxCol"
          onChange={v => dispatch({ type: 'SET_MAX_COL', maxCol: v as number })}
          options={[1, 2, 3, 4, 5].map(v => ({ id: v, label: String(v) }))}
          value={maxCol}
        />
      </MaxWidth>
    </AccordionOrBox>
  );
};

export default RadioCustomizations;
