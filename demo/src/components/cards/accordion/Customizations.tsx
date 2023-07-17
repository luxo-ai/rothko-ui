import type { RothkoKind } from '@rothko-ui/ui';
import { Checkbox, Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  bordered: boolean;
  spaced: boolean;
  withKind: boolean;
  withIcons: boolean;
  kind: RothkoKind;
  mutuallyExclusive: boolean;
};

type CustomizationAction =
  | {
      type:
        | 'TOGGLE_BORDERED'
        | 'TOGGLE_WITH_KIND'
        | 'TOGGLE_MUTUALLY_EXCLUSIVE'
        | 'TOGGLE_SPACED'
        | 'TOGGLE_WITH_ICONS';
    }
  | { type: 'SET_KIND'; kind: RothkoKind };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'TOGGLE_BORDERED':
      return { ...state, bordered: !state.bordered };
    case 'TOGGLE_SPACED':
      return { ...state, spaced: !state.spaced };
    case 'TOGGLE_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    case 'TOGGLE_WITH_ICONS':
      return { ...state, withIcons: !state.withIcons };
    case 'TOGGLE_MUTUALLY_EXCLUSIVE':
      return { ...state, mutuallyExclusive: !state.mutuallyExclusive };
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    default:
      return state;
  }
};

type AccordionCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const AccordionCustomizations = ({ dispatch, state }: AccordionCustomizationsProps) => {
  const { bordered, mutuallyExclusive, withKind, kind, spaced, withIcons } = state;
  return (
    <AccordionOrBox boxTitleVariant="h3" title="Customizations">
      <Flex padding="0.2rem" marginBottom="0.3rem" flexWrap="wrap" columnGap="4rem" rowGap="2rem">
        <MaxWidth maxW="15rem">
          <Checkbox
            withCheck
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_WITH_KIND' })}
            checked={withKind}
          >
            enable kind
          </Checkbox>
          <RadioGroup
            disabled={!withKind}
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={value => dispatch({ type: 'SET_KIND', kind: value })}
            options={kindOptions}
            style={{ marginTop: '1rem' }}
          />
        </MaxWidth>
        <MaxWidth maxW="10rem">
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_BORDERED' })}
            toggled={bordered}
          >
            boredered
          </Toggle>
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_SPACED' })}
            toggled={spaced}
            style={{ marginTop: '1rem' }}
          >
            spaced
          </Toggle>
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_MUTUALLY_EXCLUSIVE' })}
            toggled={mutuallyExclusive}
            style={{ marginTop: '1rem' }}
          >
            mutuallyExclusive
          </Toggle>
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_WITH_ICONS' })}
            toggled={withIcons}
            style={{ marginTop: '1rem' }}
          >
            withIcons
          </Toggle>
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default AccordionCustomizations;
