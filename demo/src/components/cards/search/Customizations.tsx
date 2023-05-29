import type { Option, SearchMode } from '@rothko-ui/ui';
import { Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';

type CutomizationState = {
  disabled?: boolean;
  mode?: SearchMode;
};

type CustomizationAction =
  | {
      type: 'TOGGLE_DISABLED';
    }
  | {
      type: 'TOGGLE_ESC_ON_CLOSE';
    }
  | {
      type: 'SET_MODE';
      mode: SearchMode;
    };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'TOGGLE_DISABLED':
      return { ...state, disabled: !state.disabled };
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    default:
      return state;
  }
};

type SearchCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const modeOptions: Option<SearchMode>[] = [
  { id: 'dropdown', label: 'dropdown' },
  { id: 'popout', label: 'popout' },
];

const SearchCustomizations = ({ state, dispatch }: SearchCustomizationsProps) => {
  const { disabled, mode } = state;
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
          <RadioGroup
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="appearance"
            value={mode}
            onChange={v => dispatch({ type: 'SET_MODE', mode: v })}
            options={modeOptions}
          />
          <Toggle
            kind="secondary"
            toggled={disabled}
            style={{ marginTop: '1rem' }}
            onChange={() => dispatch({ type: 'TOGGLE_DISABLED' })}
          >
            disabled
          </Toggle>
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default SearchCustomizations;
