import { Checkbox, Flex, Input, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';

type CutomizationState = {
  clearable: boolean;
  disabled: boolean;
  search: boolean;
  menuPosition: 'top' | 'bottom' | 'auto';
  bordered: boolean;
  selectedPrefix?: string;
  selectedPostfix?: string;
  placeholder?: string;
};

type CustomizationAction =
  | {
      type: 'CHECK_CLEARABLE' | 'CHECK_DISABLED' | 'CHECK_SEARCH' | 'CHECK_BORDERED';
    }
  | { type: 'SET_MENU_POSITION'; menuPosition: 'top' | 'bottom' | 'auto' }
  | { type: 'SET_SELECTED_PREFIX'; selectedPrefix: string }
  | { type: 'SET_SELECTED_POSTFIX'; selectedPostfix: string }
  | { type: 'SET_PLACEHOLDER'; placeholder: string };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'CHECK_CLEARABLE':
      return { ...state, clearable: !state.clearable };
    case 'CHECK_DISABLED':
      return { ...state, disabled: !state.disabled };
    case 'CHECK_SEARCH':
      return { ...state, search: !state.search };
    case 'CHECK_BORDERED':
      return { ...state, bordered: !state.bordered };
    case 'SET_MENU_POSITION':
      return { ...state, menuPosition: action.menuPosition };
    case 'SET_SELECTED_PREFIX':
      return { ...state, selectedPrefix: action.selectedPrefix };
    case 'SET_SELECTED_POSTFIX':
      return { ...state, selectedPostfix: action.selectedPostfix };
    case 'SET_PLACEHOLDER':
      return { ...state, placeholder: action.placeholder };
    default:
      return state;
  }
};

type DropdownCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const DropdownCustomizations = ({ dispatch, state }: DropdownCustomizationsProps) => {
  const {
    clearable,
    disabled,
    search,
    bordered,
    menuPosition,
    selectedPrefix,
    selectedPostfix,
    placeholder,
  } = state;
  return (
    <AccordionOrBox fullWidth boxTitleVariant="h3" title="Customizations">
      <Flex padding="0.2rem" marginBottom="0.3rem" flexWrap="wrap" columnGap="4rem" rowGap="2rem">
        <MaxWidth maxW="15rem">
          <Checkbox
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_DISABLED' })}
            checked={disabled}
          >
            disabled
          </Checkbox>
          <Checkbox
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_CLEARABLE' })}
            checked={clearable}
            style={{ marginTop: '1rem' }}
          >
            clearable
          </Checkbox>
          <Checkbox
            kind="secondary"
            onChange={() => dispatch({ type: 'CHECK_SEARCH' })}
            checked={search}
            style={{ marginTop: '1rem' }}
          >
            search
          </Checkbox>
          <Checkbox
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
            kind="info"
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
        <Typography.label style={{ marginTop: '1.5rem' }}>Selected Prefix</Typography.label>
        <Input
          label="selectedPrefix"
          onChange={e =>
            dispatch({ type: 'SET_SELECTED_PREFIX', selectedPrefix: e.currentTarget.value })
          }
          value={selectedPrefix}
        />
        <Typography.label style={{ marginTop: '1.5rem' }}>Selected Postfix</Typography.label>
        <Input
          label="selectedPostfix"
          onChange={e =>
            dispatch({ type: 'SET_SELECTED_POSTFIX', selectedPostfix: e.currentTarget.value })
          }
          value={selectedPostfix}
        />
      </MaxWidth>
    </AccordionOrBox>
  );
};

export default DropdownCustomizations;
