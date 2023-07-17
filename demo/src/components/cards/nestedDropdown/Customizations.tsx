import { Checkbox, Flex, Input, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';

type CutomizationState = {
  clearable: boolean;
  disabled: boolean;
  menuPosition: 'top' | 'bottom' | 'auto';
  bordered: boolean;
  placeholder?: string;
};

type CustomizationAction =
  | {
      type:
        | 'CHECK_CLEARABLE'
        | 'CHECK_CLOSE_ON_ESC'
        | 'CHECK_DISABLED'
        | 'CHECK_SEARCH'
        | 'CHECK_BORDERED';
    }
  | { type: 'SET_MENU_POSITION'; menuPosition: 'top' | 'bottom' | 'auto' }
  | { type: 'SET_PLACEHOLDER'; placeholder: string };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'CHECK_CLEARABLE':
      return { ...state, clearable: !state.clearable };
    case 'CHECK_DISABLED':
      return { ...state, disabled: !state.disabled };
    case 'CHECK_BORDERED':
      return { ...state, bordered: !state.bordered };
    case 'SET_MENU_POSITION':
      return { ...state, menuPosition: action.menuPosition };
    case 'SET_PLACEHOLDER':
      return { ...state, placeholder: action.placeholder };
    default:
      return state;
  }
};

type MultiDropdownCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const MultiDropdownCustomizations = ({ dispatch, state }: MultiDropdownCustomizationsProps) => {
  const { clearable, disabled, bordered, menuPosition, placeholder } = state;
  return (
    <AccordionOrBox fullWidth boxTitleVariant="h3" title="Customizations">
      <Flex padding="0.2rem" marginBottom="0.3rem" flexWrap="wrap" columnGap="4rem" rowGap="2rem">
        <MaxWidth maxW="15rem">
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_DISABLED' })}
            checked={disabled}
          >
            disabled
          </Checkbox>
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_CLEARABLE' })}
            checked={clearable}
            style={{ marginTop: '1rem' }}
          >
            clearable
          </Checkbox>
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_BORDERED' })}
            checked={bordered}
            style={{ marginTop: '1rem' }}
          >
            bordered
          </Checkbox>
        </MaxWidth>
        <MaxWidth maxW="15rem">
          <RadioGroup
            maxCol={2}
            kind="secondary"
            label="menu Position"
            onChange={menuPosition =>
              dispatch({
                type: 'SET_MENU_POSITION',
                menuPosition,
              })
            }
            options={[
              { id: 'top', label: 'top' },
              { id: 'bottom', label: 'bottom' },
              { id: 'auto', label: 'auto' },
            ]}
            value={menuPosition}
          />
        </MaxWidth>
      </Flex>
      <MaxWidth maxW="15rem" style={{ marginTop: '1.5rem' }}>
        <Typography.label>Placeholder</Typography.label>
        <Input
          label="placeholder"
          onChange={e => dispatch({ type: 'SET_PLACEHOLDER', placeholder: e.currentTarget.value })}
          value={placeholder}
        />
      </MaxWidth>
    </AccordionOrBox>
  );
};

export default MultiDropdownCustomizations;
