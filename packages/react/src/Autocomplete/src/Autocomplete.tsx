import {
  isNil,
  map,
  mapReverse,
  ListenableKeys,
  getKeyCode,
  debugFactory,
  Direction,
  useFieldIds,
  DefaultRenderOption,
  DropdownContainer,
  ControlButton,
  ControlState,
} from '@rothko-ui/system';
import React, { useEffect, useRef } from 'react';
import type {
  Dictionary,
  WithAria,
  Value,
  RenderOption,
  Option,
  FocusHandler,
} from '@rothko-ui/system';
import type { QueryMatchFn } from './types';
import useAutocomplete from './useAutocomplete';
import { Label, Paragraph } from '@rothko-ui/typography';
import { MenuEmpty, MenuItem, Menu } from '@rothko-ui/menu';
import type { MenuVariant, ScrollableHTMLElement } from '@rothko-ui/menu';
import { PhantomInput } from './PhantomInput';

const debug = debugFactory('<Autocomplete/>');

type StyleableComponents = 'errorText' | 'label';

type AriaAttributes =
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-errormessage'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-disabled';

export type AutocompleteProps<V extends Value, T> = {
  /**
   * The `id` attribute of the autocomplete.
   * @type {string}
   */
  id?: string;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Additional class names for the autocomplete.
   * @type {Object<StyleableComponents, string>}
   */
  classNames?: Dictionary<StyleableComponents, string>;
  /**
   * Whether the autocomplete is clearable.
   * @type {boolean}
   * @default true
   */
  clearable?: boolean;
  /**
   * Whether the autocomplete is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the autocomplete has an error state.
   * @type {boolean}
   * @default false
   */
  error?: boolean;
  /**
   * The error message to display when the autocomplete has an error state.
   * @type {string}
   * @default: 'Invalid'
   */
  errorText?: string;
  /**
   * The label for the autocomplete.
   * @type {string}
   */
  label?: string;
  /**
   * The position of the autocomplete menu.
   * @type {MenuVariant}
   * @default: 'bottom'
   */
  menuVariant?: MenuVariant;
  /**
   * The message to display when there are no search results.
   * @type {React.ReactNode}
   * @default: 'No results'
   */
  noResultsMessage?: React.ReactNode;
  /**
   * Event handler for when the autocomplete loses focus.
   */
  onBlur?: FocusHandler;
  /**
   * Event handler for when the autocomplete value changes.
   */
  onChange: (v: V | null) => void;
  /**
   * Event handler for when the autocomplete is cleared.
   */
  onClear?: () => void;
  /**
   * Event handler for when the autocomplete is closed.
   */
  onClose?: () => void;
  /**
   * Event handler for when the autocomplete gains focus.
   */
  onFocus?: FocusHandler;
  /**
   * Event handler for when the autocomplete is opened.
   */
  onOpen?: () => void;
  /**
   * The options for the autocomplete.
   */
  options: Option<V, T>[];
  /**
   * The placeholder text for the autocomplete.
   * @type {string}
   * @default: 'Select'
   */
  placeholder?: string;
  /**
   * Custom rendering function for autocomplete options.
   */
  renderOption?: RenderOption<V, T>;
  /**
   * Custom search function for filtering options.
   */
  searchFn?: QueryMatchFn<V, T>;
  /**
   * Custom styles for the autocomplete.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the autocomplete components.
   * @type {Object<StyleableComponents, React.CSSProperties>}
   */
  styles?: Dictionary<StyleableComponents, React.CSSProperties>;
  /**
   * The value(s) of the autocomplete.
   */
  value?: V | null;
};

function Autocomplete<V extends Value, T = undefined>({
  id,
  className,
  classNames = {},
  clearable = true,
  disabled,
  error,
  label,
  menuVariant = 'bottom',
  noResultsMessage = 'No results',
  onBlur,
  onChange,
  onFocus,
  onOpen,
  onClose,
  options: optionsProp,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  searchFn,
  style,
  styles: stylesProp = {},
  value,
  onClear,
  errorText = 'Invalid',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-disabled': ariaDisabled,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrorMessage,
}: WithAria<AutocompleteProps<V, T>, AriaAttributes>) {
  const menuRef = useRef<ScrollableHTMLElement>(null);
  const openReverse = menuVariant === 'top';

  const { elementId: autocompleteMenuId, labelId, errorMessageId } = useFieldIds();

  const {
    clearValue,
    moveOptionIdx,
    optIdx,
    options,
    query,
    selectOne,
    setQuery,
    closeMenu,
    containerRef,
    focus,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
  } = useAutocomplete({
    onBlur,
    onFocus,
    onClose,
    onOpen,
    disabled,
    onChange,
    onClear,
    options: optionsProp,
    searchFn,
    value,
  });

  const mapper = openReverse ? mapReverse : map;

  let controlState = open ? ControlState.Open : ControlState.Close;
  if (clearable && !isNil(value) && !disabled) {
    controlState = ControlState.Clear;
  }

  const onSelectHandler = (selectedOpt: Option<V, T>) => {
    debug('onSelectHandler');
    selectOne(selectedOpt);
    closeMenu();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    debug('onKeydown');
    const code = getKeyCode(e);
    if (!code) return;

    if (code === ListenableKeys.Space) {
      // e.preventDefault();
      if (!open) openMenu();
      return;
    }

    // these events only happen when the menu is open
    if (!open) {
      return;
    }

    if (code === ListenableKeys.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option);
    }

    if (code === ListenableKeys.Escape) {
      e.preventDefault();
      return closeMenu();
    }

    if (code === ListenableKeys.ArrowUp) {
      e.preventDefault();
      moveOptionIdx(openReverse ? Direction.INCR : Direction.DECR);
    }

    if (code === ListenableKeys.ArrowDown) {
      e.preventDefault();
      moveOptionIdx(openReverse ? Direction.DECR : Direction.INCR);
    }
  };

  useEffect(() => {
    if (open && menuRef.current && openReverse && optIdx === -1) {
      menuRef.current.scrollToBottom();
    }
  }, [open, menuRef, openReverse, optIdx]);

  return (
    <div style={style} className={className}>
      {label && (
        <Label style={stylesProp.label} className={classNames.label} id={labelId}>
          {label}
        </Label>
      )}
      <DropdownContainer
        id={id}
        error={error}
        disabled={disabled}
        focus={focus}
        open={open}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-disabled={ariaDisabled}
        aria-errormessage={
          !ariaErrorMessage && error && errorText ? errorMessageId : ariaErrorMessage
        }
        aria-controls={open ? autocompleteMenuId : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        ref={containerRef}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        tabIndex={0}
      >
        <PhantomInput
          id={autocompleteMenuId}
          onChange={v => setQuery(v)}
          disabled={disabled}
          placeholder={placeholder}
          value={query}
        />
        <ControlButton
          state={controlState}
          onClear={clearValue}
          onOpen={openMenu}
          onClose={closeMenu}
          disabled={disabled}
        />
        <Menu
          id={autocompleteMenuId}
          ref={menuRef}
          open={open}
          variant={menuVariant}
          className="max-h-(--rothko-autocomplete-dropdown-max-height) z-10"
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        >
          <MenuEmpty>{noResultsMessage}</MenuEmpty>
          {mapper(options, (option, idx) => (
            <MenuItem
              disabled={option.disabled}
              focused={optIdx === idx}
              key={option.id}
              aria-label={option.label}
              onClick={() => onSelectHandler(option)}
            >
              <RenderOpt option={option} />
            </MenuItem>
          ))}
        </Menu>
      </DropdownContainer>
      {error && errorText && (
        <Paragraph
          style={stylesProp.errorText}
          className={classNames.errorText}
          id={errorMessageId}
        >
          {errorText}
        </Paragraph>
      )}
    </div>
  );
}

export default Autocomplete;
