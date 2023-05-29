import type { RothkoKind } from '@rothko-ui/ui';
import { Flex, MaxWidth, RadioGroup } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  kind: RothkoKind;
};

type CustomizationAction = {
  type: 'SET_KIND';
  kind: RothkoKind;
};

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    default:
      return state;
  }
};

type TagCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const TagCustomizations = ({ state, dispatch }: TagCustomizationsProps) => {
  const { kind } = state;
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
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
          />
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default TagCustomizations;
