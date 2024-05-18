import type { RothkoKind } from '../../theme';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';

export type ToastDetails = {
  /**
   * The content of the toast.
   */
  content?: React.ReactNode;
  /**
   * The duration of the toast in milliseconds.
   */
  duration?: number;
  /**
   * The kind of the toast.
   */
  kind?: RothkoKind;
  /**
   * The label of the toast.
   */
  label?: React.ReactNode;
  /**
   * Indicates whether the toast has a life cycle.
   */
  withLife?: boolean;
};

export type ToastKey = string;

export type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;
