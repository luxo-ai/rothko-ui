import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';

import { classes, isArray, isNil, mapReverse, map } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import { PhantomButton } from '../../library/PhantomButton';
import DefaultRenderOption from '../../library/dropdown/RenderOption';
import type { Option, Value } from '../../library/types';
import Typography from '../Typography/Typography';
import type { DropdownInnerProps } from './types';
import useSelect from './useSelect';
import ItemText from '../../library/ItemText/ItemText';
import LabelText from '../../library/LabelText';
import { vuar } from '../../library/utils/vuar';
import useFieldIds from '../../library/hooks/useFieldIds';
import NoResultsText from '../../library/dropdown/NoResultsText';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import { CloseOutline } from '@rothko-ui/icons';
import { Direction } from '../../library/hooks/types';
import styles from './Dropdown.module.scss';

function DropdownInner<V extends Value, T = undefined>({
  id,
  bordered = true,
  className,
  clearable,
  disabled,
  error,
  label,
  menuPosition = 'bottom',
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
}: DropdownInnerProps<V, T>) {
  const openReverse = menuPosition === 'top';
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
    menuRef,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
    scrollIntoView,
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

  const hasOptions = Boolean(options.length);
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
        {!hasValue && <ItemText isPlaceHolder>{placeholder}</ItemText>}
        {!isNil(value) && isArray(value) && (
          <div className={styles['multi-select-container']}>
            {value.map(v => {
              const opt = optionLookup[v];
              return (
                <div className={styles['multi-select-label']} tabIndex={-1} key={opt.id}>
                  <Typography.bodySmall>{opt.label}</Typography.bodySmall>
                  <PhantomButton
                    aria-label={`Delete ${opt.label}`}
                    $displayFlex
                    type="button"
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
        {open && (
          <DropdownMenu id={dropdownMenuId} ref={menuRef} reverse={openReverse}>
            {!hasOptions ? (
              <NoResultsText>{noResultsMessage}</NoResultsText>
            ) : (
              <ul
                aria-multiselectable={multiple}
                aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
                role="listbox"
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

export default DropdownInner;
