import keyboardKey from 'keyboard-key';
import React, { useEffect, useRef } from 'react';

import { isNil, map, mapReverse } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import ComponentLabel from '../../library/ComponentLabel/ComponentLabel';
import DefaultRenderOption from '../../library/dropdown/RenderOption';
import useFieldIds from '../../library/hooks/useFieldIds';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';
import Typography from '../Typography/Typography';
import type { QueryMatchFn, WithAria } from './types';
import useAutocomplete from './useAutocomplete';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import { Direction } from '../../library/hooks/types';
import type { MenuVariant, ScrollableHTMLElement } from '../../library/Menu/types';
import MenuEmpty from '../../library/Menu/MenuEmpty';
import MenuItem from '../../library/Menu/MenuItem';
import styles from './Autocomplete.module.scss';

export type AutocompleteProps<V extends Value, T> = WithAria<{
  id?: string;
  /**
   * Additional class name for the autocomplete.
   */
  className?: string;
  /**
   * Whether the autocomplete is clearable.
   */
  clearable?: boolean;
  /**
   * Whether the autocomplete is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the autocomplete has an error state.
   */
  error?: boolean;
  /**
   * The error message to display when the autocomplete has an error state.
   * @default: 'Invalid'
   */
  errorText?: string;
  /**
   * The label for the autocomplete.
   */
  label?: string;
  /**
   * The position of the autocomplete menu.
   * @default: 'bottom'
   */
  menuVariant?: MenuVariant;
  /**
   * The message to display when there are no search results.
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
   * The format for displaying selected values.
   */
  selectedFormat?: string;
  /**
   * Custom styles for the autocomplete.
   */
  style?: React.CSSProperties;
  /**
   * The value(s) of the autocomplete.
   */
  value?: V | null;
}>;

function Autocomplete<V extends Value, T = undefined>({
  id,
  className,
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
  // selectedFormat,
  style,
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
}: AutocompleteProps<V, T>) {
  const menuRef = useRef<ScrollableHTMLElement>(null);
  const openReverse = menuVariant === 'top';
  const debug = useDebuggerContext('<Autocomplete/>');

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

  const canClear = clearable && !isNil(value) && !disabled;
  const mapper = openReverse ? mapReverse : map;

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openMenu();
  };

  const onSelectHandler = (selectedOpt: Option<V, T>) => {
    debug('onSelectHandler');
    selectOne(selectedOpt);
    closeMenu();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    debug('onKeydown');
    const code = keyboardKey.getCode(e);
    if (!code) return;

    if (code === keyboardKey.Spacebar) {
      // e.preventDefault();
      if (!open) openMenu();
      return;
    }

    // these events only happen when the menu is open
    if (!open) {
      return;
    }

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option);
    }

    if (code === keyboardKey.Escape) {
      e.preventDefault();
      return closeMenu();
    }

    if (code === keyboardKey.ArrowUp) {
      e.preventDefault();
      moveOptionIdx(openReverse ? Direction.INCR : Direction.DECR);
    }

    if (code === keyboardKey.ArrowDown) {
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
      {label && <ComponentLabel id={labelId}>{label}</ComponentLabel>}
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
        <input
          aria-autocomplete="list"
          aria-controls={autocompleteMenuId}
          autoComplete="off"
          spellCheck="false"
          onChange={e => setQuery(e.target.value)}
          type="text"
          aria-label="Search"
          tabIndex={0}
          value={query}
          disabled={disabled}
          className={styles['autocomplete__phantom-input']}
          placeholder={placeholder}
        />
        {!canClear ? (
          <ControlButton
            open={open}
            rotateOnOpen
            disabled={disabled}
            onClick={toggleMenu}
            type="indicator"
          />
        ) : (
          <ControlButton disabled={disabled} onClick={() => clearValue()} type="clear" />
        )}
        <DropdownMenu
          id={autocompleteMenuId}
          ref={menuRef}
          open={open}
          role="listbox"
          variant={menuVariant}
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
        </DropdownMenu>
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

export default Autocomplete;
