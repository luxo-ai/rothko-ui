import type { RothkoKind } from '@rothko-ui/ui';
import { Checkbox, Dropdown, Flex, MaxWidth, RadioGroup } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  kind: RothkoKind;
  withKind: boolean;
  offIcon?: number | null;
  onIcon?: number | null;
};

type CustomizationAction =
  | { type: 'SET_KIND'; kind: RothkoKind }
  | { type: 'SET_OFF_ICON'; offIcon?: number | null }
  | { type: 'SET_ON_ICON'; onIcon?: number | null }
  | { type: 'CHECK_WITH_KIND' };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    case 'SET_OFF_ICON':
      return { ...state, offIcon: action.offIcon };
    case 'SET_ON_ICON':
      return { ...state, onIcon: action.onIcon };
    case 'CHECK_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    default:
      return state;
  }
};

type ToggleCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const ToggleCustomizations = ({ state, dispatch }: ToggleCustomizationsProps) => {
  const { kind, onIcon, offIcon, withKind } = state;
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
          <Checkbox onChange={() => dispatch({ type: 'CHECK_WITH_KIND' })} checked={withKind}>
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
      <Dropdown
        value={onIcon}
        onChange={v => dispatch({ type: 'SET_ON_ICON', onIcon: v as number | null })}
        options={[]}
        style={{ marginTop: '1.5rem' }}
        clearable
      />
      <Dropdown
        value={offIcon}
        onChange={v => dispatch({ type: 'SET_OFF_ICON', offIcon: v as number | null })}
        options={[]}
        style={{ marginTop: '1.5rem' }}
        clearable
      />
    </AccordionOrBox>
  );
};

export default ToggleCustomizations;
