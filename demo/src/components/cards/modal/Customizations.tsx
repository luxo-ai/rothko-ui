import type { RothkoSize } from '@rothko-ui/ui';
import { Flex, Input, MaxWidth, RadioGroup, Typography } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { sizeOptions } from '../../rothkoOptions';

type CutomizationState = {
  size: RothkoSize;
  title: string;
  body: string;
};

type CustomizationAction =
  | { type: 'SET_SIZE'; size: RothkoSize }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_BODY'; body: string };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.size };
    case 'SET_TITLE':
      return { ...state, title: action.title };
    case 'SET_BODY':
      return { ...state, body: action.body };
    default:
      return state;
  }
};

type ModalCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const ModalCustomizations = ({ dispatch, state }: ModalCustomizationsProps) => {
  const { size, title, body } = state;
  return (
    <AccordionOrBox fullWidth boxTitleVariant="h3" title="Customizations">
      <Flex padding="0.2rem" marginBottom="0.3rem" flexWrap="wrap" columnGap="4rem" rowGap="2rem">
        <MaxWidth maxW="15rem">
          <RadioGroup
            maxCol={2}
            kind="secondary"
            label="Size"
            onChange={size =>
              dispatch({
                type: 'SET_SIZE',
                size,
              })
            }
            options={sizeOptions}
            value={size}
          />
        </MaxWidth>
      </Flex>
      <MaxWidth maxW="15rem" style={{ marginTop: '1.5rem' }}>
        <Typography.label>Title</Typography.label>
        <Input
          label="Title"
          onChange={e => dispatch({ type: 'SET_TITLE', title: e.currentTarget.value })}
          value={title}
        />
        <Typography.label style={{ marginTop: '1.5rem' }}>Body</Typography.label>
        <Input
          label="selectedPrefix"
          onChange={e =>
            dispatch({
              type: 'SET_BODY',
              body: e.currentTarget.value,
            })
          }
          value={body}
        />
      </MaxWidth>
    </AccordionOrBox>
  );
};

export default ModalCustomizations;
