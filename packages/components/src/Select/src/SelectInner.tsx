import React, { useEffect, useRef } from 'react';

import {
  isArray,
  isNil,
  mapReverse,
  map,
  getKeyCode,
  ListenableKeys,
  debugFactory,
  PhantomButton,
  DefaultRenderOption,
  vuar,
  useFieldIds,
  ControlButton,
  DropdownContainer,
  Direction,
  ControlState,
} from '@rothko-ui/system';

import type { Option, Value } from '@rothko-ui/system';
import { Paragraph, Label } from '@rothko-ui/typography';
import type { SelectInnerProps } from './types';
import useSelect from './useSelect';
import ItemText from './ItemText';
import { Menu, MenuItem, MenuEmpty } from '@rothko-ui/menu';
import { CloseOutline } from '@rothko-ui/icons';
import styles from './Select.module.scss';
import type { ScrollableHTMLElement } from '@rothko-ui/menu';

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
    focus,
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
        focus={focus}
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
        {!hasValue && (
          <ItemText style={{ cursor: 'pointer' }} isPlaceHolder>
            {placeholder}
          </ItemText>
        )}
        {!isNil(value) && isArray(value) && (
          <div className={styles['multi-select-container']}>
            {value.map(v => {
              const opt = optionLookup[v];
              return (
                <div className={styles['multi-select-label']} tabIndex={-1} key={opt.id}>
                  <Paragraph size="s">{opt.label}</Paragraph>
                  <PhantomButton
                    aria-label={`Delete ${opt.label}`}
                    displayFlex
                    tabIndex={-1}
                    onClick={() => {
                      deleteOne(opt.id);
                      containerRef.current?.focus();
                    }}
                  >
                    <CloseOutline
                      aria-hidden
                      fill={vuar({
                        element: 'dropdown-multiselect',
                        category: 'foreground',
                        fallback: '#000',
                      })}
                      width={16}
                      height={16}
                    />
                  </PhantomButton>
                </div>
              );
            })}
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
          className={styles['dropdown-menu']}
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
