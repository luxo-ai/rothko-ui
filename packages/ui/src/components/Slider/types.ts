import type {
  EmSize,
  PercentSize,
  RemSize,
  WithAriaControls,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';

export type SliderWidth = RemSize | EmSize | PercentSize | number;

export type WithAria<T> = WithAriaRequired<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>;

export type MultiSliderWithAria<T> = WithAriaRequired<
  WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>
>;
