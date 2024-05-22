import keyboardKey from 'keyboard-key';
import React, { useEffect, useRef } from 'react';

import { ChevronRightOutline } from '@rothko-ui/icons';
import { classes, isNil, mapReverse, map } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import DefaultRenderOption from '../../library/dropdown/RenderOption';
import type { NestedOption, RenderNestedOption, Value } from '../../library/types';
import BackButton from '../../library/Button/BackButton';
import Typography from '../Typography/Typography';
import type { SelectInnerProps } from './types';
import useNestedDropdown from './useNestedSelect';
import ItemText from '../../library/ItemText/ItemText';
import ComponentLabel from '../../library/ComponentLabel/ComponentLabel';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import useFieldIds from '../../library/hooks/useFieldIds';
import type { StackOption } from '../../library/hooks/types';
import { Direction } from '../../library/hooks/types';
import styles from './Select.module.scss';
import type { ScrollableHTMLElement } from '../../library/Menu/types';
import MenuItem from '../../library/Menu/MenuItem';

type NestedSelectProps<V extends Value, T = undefined> = Pick<
  SelectInnerProps<V, T>,
  | 'id'
  | 'placeholder'
  | 'menuVariant'
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
  /** Current value of select or value array if multiple */
  value?: V | null;
  /** select options */
  options: NestedOption<V, T>[];
  /** event handler for value change */
  onChange: (v: V | null) => void;
  /** custom method for rendering option */
  renderOption?: RenderNestedOption<V, T>;
};

function NestedSelect<V extends Value, T = undefined>({
  id,
  className,
  clearable,
  disabled,
  error,
  errorText = 'Invalid',
  label,
  menuVariant = 'bottom',
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
}: NestedSelectProps<V, T>) {
  const menuRef = useRef<ScrollableHTMLElement>(null);
  const openReverse = menuVariant === 'top';
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
    focus,
    open,
    openMenu,
    closeMenu,
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
    if (open && menuRef.current && openReverse && optIdx === -1) {
      menuRef.current.scrollToBottom();
    }
  }, [open, menuRef, openReverse, optIdx]);

  return (
    <div className={className}>
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
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
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

        <DropdownMenu
          id={dropdownMenuId}
          ref={menuRef}
          open={open}
          variant={menuVariant}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        >
          {/* Maaybe use flexbox */}
          {!openReverse && canGoToPrevCategory && (
            <div className={styles['nested-button-container']}>
              <BackButton
                onClick={() => {
                  goToPrevCategory();
                  containerRef.current?.focus();
                }}
              />
            </div>
          )}
          {!openReverse && title && (
            <Typography.label className={styles['nested-dropdown-category-title']}>
              {title}
            </Typography.label>
          )}
          {mapper(options, (option, idx) => (
            <MenuItem
              disabled={option.disabled}
              aria-label={option.label}
              focused={optIdx === idx}
              key={option.id}
              onClick={() => {
                onSelectHandler(option);
                containerRef.current?.blur();
              }}
            >
              <div className={styles['nested-option-container']}>
                <RenderOpt option={option} />
                {option.hasMore && <ChevronRightOutline width="1rem" height="1rem" />}
              </div>
            </MenuItem>
          ))}
          {openReverse && title && (
            <Typography.label
              className={classes(styles['nested-dropdown-category-title'], styles['title-reverse'])}
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
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

export default NestedSelect;
