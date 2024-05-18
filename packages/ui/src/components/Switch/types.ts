import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';

export type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHasPopup<
      WithAriaExpanded<
        WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
      >
    >
  >
>;
