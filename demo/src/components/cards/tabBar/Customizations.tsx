import type { RothkoKind } from '@rothko-ui/ui';
import { Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  kind?: RothkoKind;
  withKind: boolean;
};

type CustomizationAction =
  | {
      type: 'TOGGLE_WITH_KIND';
    }
  | {
      type: 'SET_KIND';
      kind: RothkoKind;
    };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'TOGGLE_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    default:
      return state;
  }
};

type TabBarCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const TabBarCustomizations = ({ state, dispatch }: TabBarCustomizationsProps) => {
  const { kind, withKind } = state;
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
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default TabBarCustomizations;
