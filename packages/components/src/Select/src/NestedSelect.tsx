import React, { useEffect, useRef } from 'react';

import { ChevronRightOutline } from '@rothko-ui/icons';
import {
  useFieldIds,
  ControlButton,
  DropdownContainer,
  classes,
  isNil,
  mapReverse,
  map,
  debugFactory,
  DefaultRenderOption,
  Direction,
  ControlState,
  getKeyCode,
  ListenableKeys,
} from '@rothko-ui/system';

import type { StackOption, NestedOption, RenderNestedOption, Value } from '@rothko-ui/system';
import BackButton from './BackButton/BackButton';
import { Label, Paragraph } from '@rothko-ui/typography';
import { Menu, MenuItem } from '@rothko-ui/menu';
import type { SelectInnerProps } from './types';
import useNestedDropdown from './useNestedSelect';
import ItemText from './ItemText';
import styles from './Select.module.scss';
import type { ScrollableHTMLElement } from '@rothko-ui/menu';

const debug = debugFactory('<NestedDropdown />');

type NestedSelectProps<V extends Value, T = undefined> = Pick<
  SelectInnerProps<V, T>,
  | 'id'
  | 'placeholder'
  | 'menuVariant'
  | 'label'
  | 'style'
  | 'styles'
  | 'noResultsMessage'
  | 'onOpen'
  | 'error'
  | 'onFocus'
  | 'onBlur'
  | 'clearable'
  | 'className'
  | 'classNames'
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
  classNames = {},
  style,
  styles: stylesProp = {},
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

  let controlState = open ? ControlState.Open : ControlState.Close;
  if (clearable && !isNil(value) && !disabled) {
    controlState = ControlState.Clear;
  }

  const mapper = openReverse ? mapReverse : map;

  const onSelectHandler = (option: StackOption<V, T>) => {
    selectOne(option);
    if (!option.hasMore) {
      closeMenu();
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

    if (clearable && (code === ListenableKeys.Delete || code === ListenableKeys.Backspace)) {
      e.preventDefault();
      return clearValue();
    }

    if (code === ListenableKeys.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option);
    }

    if (code === ListenableKeys.ArrowLeft) {
      if (canGoToPrevCategory) {
        e.preventDefault();
        return goToPrevCategory();
      }
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
    <div className={className} style={style}>
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
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        tabIndex={0}
      >
        {isNil(value) && <ItemText isPlaceHolder>{placeholder}</ItemText>}
        {!isNil(value) && <ItemText>{pathToCurrentOption.map(o => o.label).join(' / ')}</ItemText>}
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
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
          className={styles['dropdown-menu']}
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
            <Paragraph size="xs" className={styles['nested-dropdown-category-title']}>
              {title}
            </Paragraph>
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
            <Paragraph
              size="xs"
              className={classes(styles['nested-dropdown-category-title'], styles['title-reverse'])}
            >
              {title}
            </Paragraph>
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

export default NestedSelect;
