import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaLabeling,
  WithAriaLive,
  WithAriaPressed,
} from '../../types';

export type WithButtonAria<T> = WithAriaDisabled<
  WithAriaLive<
    WithAriaPressed<
      WithAriaHidden<
        WithAriaExpanded<WithAriaHasPopup<WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>>>
      >
    >
  >
>;

export type ButtonAppearance = 'filled' | 'outline';
export type ButtonShape = 'pill' | 'square';
