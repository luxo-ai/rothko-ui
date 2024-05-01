import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';

import { ChevronRightOutline } from '@rothko-ui/icons';
import { classes, isNil, mapReverse, map } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import DefaultRenderOption from '../../library/dropdown/RenderOption';
import type { NestedOption, RenderNestedOption, Value } from '../../library/types';
import BackButton from '../../library/BackButton';
import Typography from '../Typography/Typography';
import type { DropdownInnerProps } from './types';
import useNestedDropdown from './useNestedDropdown';
import ItemText from '../../library/ItemText/ItemText';
import LabelText from '../../library/LabelText';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import useFieldIds from '../../library/hooks/useFieldIds';
import type { StackOption } from '../../library/hooks/types';
import { Direction } from '../../library/hooks/types';
import styles from './Dropdown.module.scss';

type NestedDropdownProps<V extends Value, T = undefined> = Pick<
  DropdownInnerProps<V, T>,
  | 'id'
  | 'placeholder'
  | 'bordered'
  | 'menuPosition'
  | 'label'
  | 'style'
  | 'noResultsMessage'
  | 'onOpen'
  | 'error'
  | 'onFocus'
  | 'onBlur'
  | 'clearable'
  | 'className'
  | 'disabled'
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-disabled'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-errormessage'
  | 'errorText'
  | 'onClear'
  | 'onClose'
> & {
  /** Current value of dropdown or value array if multiple */
  value?: V | null;
  /** dropdown options */
  options: NestedOption<V, T>[];
  /** event handler for value change */
  onChange: (v: V | null) => void;
  /** custom method for rendering option */
  renderOption?: RenderNestedOption<V, T>;
};

function NestedDropdown<V extends Value, T = undefined>({
  id,
  className,
  clearable,
  disabled,
  error,
  errorText = 'Invalid',
  label,
  menuPosition = 'bottom',
  bordered = true,
  onBlur,
  onChange,
  onFocus,
  onOpen,
  onClear,
  onClose,
  options: optionsRaw,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  value,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-disabled': ariaDisabled,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrorMessage,
}: NestedDropdownProps<V, T>) {
  const openReverse = menuPosition === 'top';
  const debug = useDebuggerContext('<NestedDropdown />');

  const { elementId: dropdownMenuId, labelId, errorMessageId } = useFieldIds();

  const {
    options,
    canGoToPrevCategory,
    optIdx,
    title,
    selectOne,
    goToPrevCategory,
    moveOptionIdx,
    containerRef,
    menuRef,
    focus,
    open,
    openMenu,
    closeMenu,
    scrollIntoView,
    onBlurHandler,
    onFocusHandler,
    clearValue,
    pathToCurrentOption,
  } = useNestedDropdown({
    options: optionsRaw,
    onChange,
    onFocus,
    onBlur,
    onOpen,
    disabled,
    onClose,
    onClear,
    value,
  });

  const hasOptions = Boolean(options.length);
  const hasValue = !isNil(value);
  const canClear = clearable && hasValue && !disabled;
  const mapper = openReverse ? mapReverse : map;

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openMenu();
  };

  const onSelectHandler = (option: StackOption<V, T>) => {
    selectOne(option);
    if (!option.hasMore) {
      closeMenu();
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

    if (clearable && (code === keyboardKey.Delete || code === keyboardKey.Backspace)) {
      e.preventDefault();
      return clearValue();
    }

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option);
    }

    if (code === keyboardKey.ArrowLeft) {
      if (canGoToPrevCategory) {
        e.preventDefault();
        return goToPrevCategory();
      }
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
  }, [optIdx, openReverse, open, scrollIntoView, dropdownMenuId]);

  const containerClasses = classes({
    error,
    disabled,
    focus,
    minimal: !bordered,
    empty: !hasOptions,
  });

  return (
    <div className={className}>
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
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        className={containerClasses}
        tabIndex={0}
      >
        {isNil(value) && <ItemText isPlaceHolder>{placeholder}</ItemText>}
        {!isNil(value) && <ItemText>{pathToCurrentOption.map(o => o.label).join(' / ')}</ItemText>}
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
            {/* Maaybe use flexbox */}
            {!openReverse && canGoToPrevCategory && (
              <div className={classes(styles['nested-button-container'])}>
                <BackButton
                  onClick={() => {
                    goToPrevCategory();
                    containerRef.current?.focus();
                  }}
                />
              </div>
            )}
            {!openReverse && title && (
              <Typography.label className={classes(styles['nested-dropdown-category-title'])}>
                {title}
              </Typography.label>
            )}
            <ul
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
                    className={classes('option', {
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
                      containerRef.current?.blur();
                    }}
                  >
                    <div className={styles['nested-option-container']}>
                      <RenderOpt option={option} />
                      {option.hasMore && <ChevronRightOutline width="1rem" height="1rem" />}
                    </div>
                  </li>
                );
              })}
            </ul>
            {openReverse && title && (
              <Typography.label
                className={classes(
                  styles['nested-dropdown-category-title'],
                  styles['title-reverse']
                )}
              >
                {title}
              </Typography.label>
            )}
            {openReverse && canGoToPrevCategory && (
              <div className={classes(styles['nested-button-container'], styles['button-reverse'])}>
                <BackButton
                  onClick={() => {
                    goToPrevCategory();
                    containerRef.current?.focus();
                  }}
                />
              </div>
            )}
          </DropdownMenu>
        )}
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

export default NestedDropdown;
