import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
  WithAriaErrorMessage,
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
