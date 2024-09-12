import type React from 'react';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';
import type { WithAria } from '../../types';
import type { MenuVariant } from '../../library/Menu/types';

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-disabled'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-errormessage';

type StyledComponents = 'errorText' | 'label';

export type StackOption<V extends Value, T = undefined> = Option<V, T> & {
  hasMore?: boolean;
  more: Generator<StackOption<V, T>> | undefined;
};

export type StackValue<V extends Value, T = undefined> = {
  title?: string;
  path: string[];
  options: StackOption<V, T>[];
};

export type SelectInnerProps<V extends Value, T> = WithAria<
  {
    id?: string;
    /**
     * Additional class name for the select.
     */
    className?: string;
    /**
     * Additional class names for the select components.
     */
    classNames?: Partial<Record<StyledComponents, string>>;
    /**
     * Whether the select is clearable.
     */
    clearable?: boolean;
    /**
     * Whether the select is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the select has an error state.
     */
    error?: boolean;
    /**
     * The error message to display when the select has an error state.
     * @default: 'Invalid'
     */
    errorText?: string;
    /**
     * The label for the select.
     */
    label?: string;
    /**
     * The position of the select menu.
     * @default: 'bottom'
     */
    menuVariant?: MenuVariant;
    /**
     * Whether the select allows multiple selections.
     */
    multiple?: boolean;
    /**
     * The message to display when there are no search results.
     * @default: 'No results'
     */
    noResultsMessage?: React.ReactNode;
    /**
     * Event handler for when the select loses focus.
     */
    onBlur?: FocusHandler;
    /**
     * Event handler for when the select value changes.
     */
    onChange: (v: V | V[] | null) => void;
    /**
     * Event handler for when the select is cleared.
     */
    onClear?: () => void;
    /**
     * Event handler for when the select is closed.
     */
    onClose?: () => void;
    /**
     * Event handler for when an option is deleted in multiple selection mode.
     */
    onDelete?: (v: V) => void;
    /**
     * Event handler for when the select gains focus.
     */
    onFocus?: FocusHandler;
    /**
     * Event handler for when the select is opened.
     */
    onOpen?: () => void;
    /**
     * The options for the select.
     */
    options: Option<V, T>[];
    /**
     * The placeholder text for the select.
     * @default: 'Select'
     */
    placeholder?: string;
    /**
     * Custom rendering function for select options.
     */
    renderOption?: RenderOption<V, T>;
    /**
     * Custom styles for the select.
     */
    style?: React.CSSProperties;
    /**
     * Additional inline styles for the select components
     */
    styles?: Partial<Record<StyledComponents, React.CSSProperties>>;
    /**
     * The value(s) of the select.
     */
    value?: V | V[] | null;
  },
  AriaAttributes
>;
