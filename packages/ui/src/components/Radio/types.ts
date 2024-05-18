import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';

export type WithAria<T> = WithAriaErrorMessage<WithAriaControls<WithAriaLabeling<T>>>;

export type RadioGroupWithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
  >
>;
