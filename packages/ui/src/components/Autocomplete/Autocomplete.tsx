import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { classes, isNil, map, mapReverse } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import ItemText from '../../library/ItemText';
import LabelText from '../../library/LabelText';
import DefaultRenderOption from '../../library/RenderOption';
import { hideChromeBrowserOutline } from '../../library/Styles';
import useFieldIds from '../../library/hooks/useFieldIds';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';
import Typography from '../Typography/Typography';
import typographyStyles from '../Typography/styles';
import type { QueryMatchFn, WithAria } from './types';
import useAutocomplete from './useAutocomplete';
import NoResultsText from '../../library/dropdown/NoResultsText';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import { Direction } from '../../library/hooks/types';

export type DropdownProps<V extends Value, T> = WithAria<{
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
  onChange: (v: V | null) => void;
  onClear?: () => void;
  onClose?: () => void;
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
  searchFn?: QueryMatchFn<V, T>;
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
  value?: V | null;
}>;

function DropdownInner<V extends Value, T = undefined>({
  id,
  bordered = true,
  className,
  clearable = true,
  disabled,
  error,
  label,
  menuPosition = 'bottom',
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
}: DropdownProps<V, T>) {
  const openReverse = menuPosition === 'top';
  const debug = useDebuggerContext('<Dropdown/>');

  const { elementId: dropdownMenuId, labelId, errorMessageId } = useFieldIds();

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
    menuRef,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
    scrollIntoView,
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

  const hasOptions = Boolean(options.length);
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
    if (!open) {
      return;
    }
    if (optIdx < 0 && openReverse) {
      scrollIntoView(`#${dropdownMenuId}-opt-0`);
      return;
    }
    if (optIdx >= 0) {
      scrollIntoView(`#${dropdownMenuId}-opt-${optIdx}`);
      return;
    }
  }, [optIdx, openReverse, open, scrollIntoView, options.length, dropdownMenuId]);

  const containerClasses = classes({
    error,
    disabled,
    focus,
    minimal: !bordered,
    empty: !hasOptions,
  });

  return (
    <div style={style} className={className}>
      {label && <LabelText id={labelId}>{label}</LabelText>}
      <DropdownContainer
        id={id}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-disabled={ariaDisabled}
        aria-errormessage={
          !ariaErrorMessage && error && errorText ? errorMessageId : ariaErrorMessage
        }
        aria-controls={open ? dropdownMenuId : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        ref={containerRef}
        className={containerClasses}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        tabIndex={0}
      >
        {!disabled && (
          <PhantomInput
            aria-autocomplete="list"
            aria-controls="dropdown-list"
            autoComplete="off"
            spellCheck="false"
            onChange={e => setQuery(e.target.value)}
            type="text"
            aria-label="Search"
            tabIndex={0}
            value={query}
            className={classes({ disabled })}
          />
        )}
        <div>{isNil(value) && !query && <ItemText $placeHolder>{placeholder}</ItemText>}</div>
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
        {open && (
          <DropdownMenu id={dropdownMenuId} role="listbox" ref={menuRef} reverse={openReverse}>
            {!hasOptions ? (
              <NoResultsText>{noResultsMessage}</NoResultsText>
            ) : (
              <ul
                aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
                tabIndex={-1}
              >
                {mapper(options, (option, idx) => {
                  const optionDisabled = option.disabled || disabled;
                  const selected = optIdx === idx;
                  return (
                    <li
                      aria-disabled={optionDisabled}
                      aria-label={option.label}
                      aria-selected={selected}
                      className={classes({
                        selected,
                        disabled: optionDisabled,
                      })}
                      id={`${dropdownMenuId}-opt-${idx}`}
                      key={option.id}
                      role="option"
                      tabIndex={-1}
                      onClick={e => {
                        if (optionDisabled) return;
                        e.preventDefault();
                        onSelectHandler(option);
                      }}
                    >
                      <RenderOpt option={option} />
                    </li>
                  );
                })}
              </ul>
            )}
          </DropdownMenu>
        )}
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

const PhantomInput = styled.input`
  ${hideChromeBrowserOutline}
  ${typographyStyles.body}
  position: absolute;
  inset: 0;
  background: none !important;
  border: none !important;
  outline: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  // left padding of icon + right padding of icon + width of icon
  padding: 0.5rem calc(1rem + 1rem + 16px) 0.5rem 1rem;
  cursor: text;
`;

export default DropdownInner;
