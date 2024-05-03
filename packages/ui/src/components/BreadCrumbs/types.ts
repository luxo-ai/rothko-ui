import type {
  WithAriaControls,
  WithAriaCurrent,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaLabel,
  WithAriaLabeling,
  WithAriaLabelledBy,
  WithAriaSelected,
} from '../../types';

// Breadcrumb item aria attributes
export type ItemsWithAria<T> = WithAriaHasPopup<
  WithAriaLabelledBy<WithAriaSelected<WithAriaControls<WithAriaLabel<WithAriaCurrent<T>>>>>
>;

// Breadcrumb aria attributes
export type WithAria<T> = WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>;
