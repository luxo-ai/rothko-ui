import type React from 'react';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';
import type {
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';

type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<WithAriaInvalid<WithAriaDisabled<WithAriaLabeling<T>>>>
>;

export type StackOption<V extends Value> = Option<V, { hasMore: boolean }>;

export type StackValue<V extends Value> = {
  title?: string;
  options: StackOption<V>[];
};

export type DropdownInnerProps<V extends Value, T> = WithAria<{
  id?: string;
  /**
   * Whether the dropdown should have a border.
   * @default: true
   */
  bordered?: boolean;
  /**
   * Additional class name for the dropdown.
   */
  className?: string;
  /**
   * Whether the dropdown is clearable.
   */
  clearable?: boolean;
  /**
   * Whether the dropdown is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the dropdown has an error state.
   */
  error?: boolean;
  /**
   * The error message to display when the dropdown has an error state.
   * @default: 'Invalid'
   */
  errorText?: string;
  /**
   * The label for the dropdown.
   */
  label?: string;
  /**
   * The position of the dropdown menu.
   * @default: 'bottom'
   */
  menuPosition?: 'top' | 'bottom';
  /**
   * Whether the dropdown allows multiple selections.
   */
  multiple?: boolean;
  /**
   * The message to display when there are no search results.
   * @default: 'No results'
   */
  noResultsMessage?: React.ReactNode;
  /**
   * Event handler for when the dropdown loses focus.
   */
  onBlur?: FocusHandler;
  /**
   * Event handler for when the dropdown value changes.
   */
  onChange: (v: V | V[] | null) => void;
  /**
   * Event handler for when the dropdown is cleared.
   */
  onClear?: () => void;
  /**
   * Event handler for when the dropdown is closed.
   */
  onClose?: () => void;
  /**
   * Event handler for when an option is deleted in multiple selection mode.
   */
  onDelete?: (v: V) => void;
  /**
   * Event handler for when the dropdown gains focus.
   */
  onFocus?: FocusHandler;
  /**
   * Event handler for when the dropdown is opened.
   */
  onOpen?: () => void;
  /**
   * The options for the dropdown.
   */
  options: Option<V, T>[];
  /**
   * The placeholder text for the dropdown.
   * @default: 'Select'
   */
  placeholder?: string;
  /**
   * Custom rendering function for dropdown options.
   */
  renderOption?: RenderOption<V, T>;
  /**
   * The format for displaying selected values.
   */
  selectedFormat?: string;
  /**
   * Custom styles for the dropdown.
   */
  style?: React.CSSProperties;
  /**
   * The value(s) of the dropdown.
   */
  value?: V | V[] | null;
}>;
