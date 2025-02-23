import { Menu, MenuItem, MenuEmpty } from '@rothko-ui/menu';
import type { MenuVariant, ScrollableHTMLElement } from '@rothko-ui/menu';
import {
  isArray,
  isNil,
  mapReverse,
  map,
  getKeyCode,
  ListenableKeys,
  debugFactory,
  DefaultRenderOption,
  useFieldIds,
  ControlButton,
  DropdownContainer,
  Direction,
  ControlState,
} from '@rothko-ui/system';
import type {
  Dictionary,
  FocusHandler,
  Option,
  RenderOption,
  Value,
  WithAria,
} from '@rothko-ui/system';
import { Paragraph, Label } from '@rothko-ui/typography';
import React, { useEffect, useRef } from 'react';

import ItemText from './ItemText';
import { MultiSelectValue } from './MultiSelectValue';
import useSelect from './useSelect';

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

export type SelectInnerProps<V extends Value, T> = WithAria<
  {
    id?: string;
    /**
     * CSS class name(s).
     */
    className?: string;
    /**
     * Additional class names for the select components.
     */
    classNames?: Dictionary<StyledComponents, string>;
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
     * Inline styles for the select.
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

function SelectInner<V extends Value, T = undefined>({
  id,
  className,
  classNames = {},
  clearable,
  disabled,
  error,
  label,
  menuVariant = 'bottom', // menuVariant
  multiple,
  noResultsMessage = 'No results',
  onBlur,
  onChange,
  onClear,
  onDelete,
  onFocus,
  onOpen,
  onClose,
  options: optionsRaw,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  style,
  styles: stylesProp = {},
  value,
  errorText = 'Invalid',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-disabled': ariaDisabled,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrorMessage,
}: SelectInnerProps<V, T>) {
  const menuRef = useRef<ScrollableHTMLElement>(null);
  const openReverse = menuVariant === 'top';
  const debug = debugFactory('<Dropdown/>');

  const { elementId: dropdownMenuId, labelId, errorMessageId } = useFieldIds();

  const {
    deleteOne,
    moveOptionIdx,
    optIdx,
    optionLookup,
    options,
    selectOne,
    closeMenu,
    containerRef,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
    clearValue,
  } = useSelect({
    disabled,
    multiple,
    onChange,
    onDelete,
    onClear,
    options: optionsRaw,
    value,
    onBlur,
    onFocus,
    onOpen,
    onClose,
  });

  const hasValue = !isNil(value) && (!isArray(value) || value.length > 0);

  let controlState = open ? ControlState.Open : ControlState.Close;
  if (clearable && hasValue && !disabled) {
    controlState = ControlState.Clear;
  }

  const mapper = openReverse ? mapReverse : map;

  const onSelectHandler = (selectedOpt: Option<V, T>) => {
    debug('onSelectHandler');
    selectOne(selectedOpt);
    const shouldClose = !multiple;
    if (shouldClose) closeMenu();
    // below???
    if (multiple) {
      containerRef.current?.focus();
    } else {
      containerRef.current?.blur();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    debug('onKeydown');
    const code = getKeyCode(e);
    if (!code) return;

    if (code === ListenableKeys.Space) {
      e.preventDefault();
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

    if (code === ListenableKeys.Delete || code === ListenableKeys.Backspace) {
      if (!value) {
        return;
      }
      if (isArray(value) && value.length > 0) {
        e.preventDefault();
        deleteOne(value[value.length - 1]);
      }
      if (!isArray(value)) {
        e.preventDefault();
        clearValue();
      }
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
        open={open}
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
        aria-expanded={open}
        ref={containerRef}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        tabIndex={0}
      >
        {!hasValue && <ItemText className="cursor-pointer opacity-75">{placeholder}</ItemText>}
        {!isNil(value) && isArray(value) && (
          <div className="flex flex-wrap gap-[0.5rem]">
            {value.map(v => (
              <MultiSelectValue
                key={String(v)}
                option={optionLookup[v]}
                onClear={valId => {
                  deleteOne(valId);
                  containerRef.current?.focus();
                }}
              />
            ))}
          </div>
        )}
        {!multiple && !isNil(value) && !isArray(value) && (
          <ItemText>{optionLookup[value].label}</ItemText>
        )}
        <ControlButton
          state={controlState}
          disabled={disabled}
          onClear={clearValue}
          onOpen={closeMenu}
          onClose={openMenu}
        />
        <Menu
          id={dropdownMenuId}
          ref={menuRef}
          open={open}
          variant={menuVariant}
          aria-multiselectable={multiple}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
          className="max-h-[13rem] z-10" // just like autocomplete
        >
          <MenuEmpty>{noResultsMessage}</MenuEmpty>
          {mapper(options, (option, idx) => (
            <MenuItem
              focused={optIdx === idx}
              disabled={option.disabled}
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

export default SelectInner;
