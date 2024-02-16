import type React from 'react';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';

export type QueryMatchFn<V, T = undefined> = (query: string, opt: Option<V, T>) => boolean;

export type DropdownInnerProps<V extends Value, T> = {
  /** Current value of dropdown or value array if multiple */
  value?: V | V[] | null;
  /** placeholder in input */
  placeholder?: string;
  /** dropdown options */
  options: Option<V, T>[];
  /** event handler for value change */
  onChange: (v: V | V[] | null) => void;
  /** onOpen handler */
  onOpen?: () => void;
  /** onBlur handler  */
  onBlur?: FocusHandler;
  /** onFocus handler */
  onFocus?: FocusHandler;
  /** callback triggered on deletion */
  onDelete?: (v: V) => void;
  /** can you clear the selection */
  clearable?: boolean;
  /** is the dropdown disabled */
  disabled?: boolean;
  /** did an error occurr. alert user when true */
  error?: boolean;
  /** are multiple selections allowed? (value is array) */
  multiple?: boolean;
  /** flag indicating if you can search for options or custom matcher */
  search?: boolean | QueryMatchFn<V, T>;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, T>;
  /** Message to display when there are no results. */
  noResultsMessage?: React.ReactNode;
  /* class names of outer wrapper */
  className?: string;
  /** if the dropdown has a label */
  label?: string;
  /** open dropdown position */
  menuPosition?: 'top' | 'bottom' | 'auto';
  /** does the dropdown have a border, default: true */
  bordered?: boolean;
  /** prefix of a selected item */
  selectedPrefix?: string;
  /** postfix of a selected item */
  selectedPostfix?: string;
  /** inline style overrides */
  style?: React.CSSProperties;
};
