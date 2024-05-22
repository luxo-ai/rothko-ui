import keyboardKey from 'keyboard-key';
import React, { useEffect, useRef } from 'react';

import { isArray, isNil, mapReverse, map } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import PhantomButton from '../../library/Button/PhantomButton';
import DefaultRenderOption from '../../library/dropdown/RenderOption';
import type { Option, Value } from '../../library/types';
import Typography from '../Typography/Typography';
import type { SelectInnerProps } from './types';
import useSelect from './useSelect';
import ItemText from '../../library/ItemText/ItemText';
import ComponentLabel from '../../library/ComponentLabel/ComponentLabel';
import { vuar } from '../../library/utils/vuar';
import useFieldIds from '../../library/hooks/useFieldIds';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import { CloseOutline } from '@rothko-ui/icons';
import { Direction } from '../../library/hooks/types';
import styles from './Select.module.scss';
import MenuItem from '../../library/Menu/MenuItem';
import MenuEmpty from '../../library/Menu/MenuEmpty';
import type { ScrollableHTMLElement } from '../../library/Menu/types';

function SelectInner<V extends Value, T = undefined>({
  id,
  className,
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
  // selectedFormat,
  style,
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
  const debug = useDebuggerContext('<Dropdown/>');

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
  const canClear = clearable && hasValue && !disabled;
  const mapper = openReverse ? mapReverse : map;

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openMenu();
  };

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
    const code = keyboardKey.getCode(e);
    if (!code) return;

    if (code === keyboardKey.Spacebar) {
      e.preventDefault();
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

    if (code === keyboardKey.Delete || code === keyboardKey.Backspace) {
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
                  <Typography.bodySmall>{opt.label}</Typography.bodySmall>
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
          id={dropdownMenuId}
          ref={menuRef}
          open={open}
          variant={menuVariant}
          aria-multiselectable={multiple}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
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
        </DropdownMenu>
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

export default SelectInner;
