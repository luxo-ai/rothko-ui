import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';
import { classes, isArray, isNil } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ItemText, LabelText } from '../../Library/Common';
import { useDebuggerContext } from '../../Library/DebuggerContext';
import useDropdownMenu from '../../Library/Hooks/useMenu';
import { PhantomButton } from '../../Library/PhantomButton';
import { DefaultRenderOption } from '../../Library/RenderOption';
import { hideChromeBrowserOutline } from '../../Library/Styles';
import type { Value } from '../../Library/types';
import { directionMap } from '../../utils/keyUtils';
import Typography, { textStyle } from '../Typography/Typography';
import { ControlButton, DropdownContainerDiv, DropdownMenu, TextContainerDiv } from './Shared';
import type { DropdownInnerProps } from './types';
import useSelect from './useSelect';

function DropdownInner<V extends Value, T = undefined>({
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
  onDelete,
  onFocus,
  onOpen,
  options: optionsRaw,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  search,
  selectedPostfix = '',
  selectedPrefix = '',
  style,
  value,
}: DropdownInnerProps<V, T>) {
  const debug = useDebuggerContext('<Dropdown/>');

  const openReverse = menuPosition === 'top';

  const {
    deleteOne,
    moveOptionIdx,
    optIdx,
    optionLookup,
    options,
    query,
    reset,
    selectOne,
    setQuery,
  } = useSelect({
    disabled,
    multiple,
    onChange,
    onDelete,
    openReverse,
    options: optionsRaw,
    search,
    value,
  });

  const {
    closeMenu,
    containerRef,
    focus,
    menuRef,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
    scrollIntoView,
  } = useDropdownMenu({
    disabled,
    onBlur,
    onFocus,
    onOpen,
  });

  const hasOptions = Boolean(options.length);
  const hasValue = !isNil(value) && (!isArray(value) || value.length > 0);
  const canClear = clearable && hasValue && !disabled;

  // add these to the menu hook...
  const openDropdownMenu = () => {
    if (open || disabled) return;
    if (isNil(value)) reset();
    openMenu();
  };

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openDropdownMenu();
  };

  const closeOnChange = () => {
    debug('closeOnChange');
    const shouldClose = !multiple;
    if (shouldClose) closeMenu();
  };

  const onSelectHandler = (selected: V | null) => {
    debug('selectHanlder');
    selectOne(selected);
    closeOnChange();
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

    // event only happens if the menu is not open
    if (code === keyboardKey.Spacebar) {
      if (!search) e.preventDefault();
      if (!open) openDropdownMenu();
      return;
    }

    // these keydown events only happen when the menu is open
    if (!open) return;

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option.id);
    }

    if (code === keyboardKey.Escape) {
      // if (!closeOnEsc) return;
      e.preventDefault();
      return closeMenu();
    }

    if (code === keyboardKey.Delete) {
      if (!isArray(value)) return;
      e.preventDefault();
      const lastAdded = value[value.length - 1];
      if (!lastAdded) return;
      deleteOne(lastAdded);
    }

    const direction = directionMap[code];
    if (!direction) return;
    e.preventDefault();
    moveOptionIdx(direction);
  };

  useEffect(() => {
    if (!open) return;
    const scrollIdx = optIdx < 0 && openReverse ? options.length - 1 : optIdx;
    scrollIntoView(`#option-${scrollIdx}`);
  }, [optIdx, openReverse, open]);

  const containerClasses = classes({
    error,
    disabled,
    focus,
    minimal: !bordered,
    empty: !hasOptions,
  });

  const dropdownMenuClasses = classes({
    ['open-reverse']: openReverse,
  });

  return (
    <div style={style} className={className}>
      {label && <LabelText>{label}</LabelText>}
      <DropdownContainerDiv
        ref={containerRef}
        className={containerClasses}
        onBlur={onBlurHandler}
        onClick={openDropdownMenu}
        onFocus={onFocusHandler}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {search && !disabled && (
          <PhantomInput
            onChange={e => setQuery(e.target.value)}
            type="text"
            aria-label="dropdown search"
            tabIndex={0}
            value={open ? query ?? '' : ''}
            className={classes({ disabled })}
          />
        )}
        <TextContainerDiv
          className={classes({
            hidden: query?.length && (hasOptions || open),
            disabled,
            multiple,
          })}
          tabIndex={-1}
        >
          {!hasValue && (!query || !hasOptions) && <ItemText placeHolder>{placeholder}</ItemText>}
          {!isNil(value) && isArray(value) && (
            <MultiSelectContainerDiv>
              {value.map(v => {
                const opt = optionLookup[v];
                return (
                  <MultiSelectLabelDiv tabIndex={-1} key={opt.id}>
                    <MultiSelectItemText>
                      {selectedPrefix}
                      {opt.label}
                      {selectedPostfix}
                    </MultiSelectItemText>
                    <PhantomButton
                      $displayFlex
                      type="button"
                      tabIndex={-1}
                      onClick={() => {
                        deleteOne(opt.id);
                        containerRef.current?.focus();
                      }}
                    >
                      <CloseOutline
                        fill="var(--rothko-dropdown-multiselect-text, #000)"
                        width={16}
                        height={16}
                      />
                    </PhantomButton>
                  </MultiSelectLabelDiv>
                );
              })}
            </MultiSelectContainerDiv>
          )}
          {!multiple && !isNil(value) && !isArray(value) && (
            <ItemText>
              {selectedPrefix}
              {optionLookup[value].label}
              {selectedPostfix}
            </ItemText>
          )}
        </TextContainerDiv>
        {!canClear ? (
          <ControlButton
            $open={open}
            $rotateOnOpen
            aria-label="open dropdown"
            className={classes({ disabled })}
            onClick={toggleMenu}
          >
            <ChevronDownOutline width="1rem" height="1rem" />
          </ControlButton>
        ) : (
          <ControlButton
            aria-label="clear item"
            className={classes({ disabled })}
            onClick={() => onSelectHandler(null)}
          >
            <CloseOutline width="1rem" height="1rem" />
          </ControlButton>
        )}
        {open && (
          <DropdownMenu
            ref={menuRef}
            className={dropdownMenuClasses}
            tabIndex={-1}
            data-rothko-body-scroll-lock-ignore
          >
            {!hasOptions ? (
              <NoResultsText>{noResultsMessage}</NoResultsText>
            ) : (
              <ul role="listbox" tabIndex={-1}>
                {options.map((option, idx) => {
                  const selected = optIdx === idx;
                  return (
                    <li
                      aria-disabled={option.disabled}
                      aria-label={option.label}
                      aria-selected={selected}
                      className={classes({ selected })}
                      id={`option-${option.id}`}
                      key={`option-${option.id}`}
                      role="option"
                      tabIndex={-1}
                      onClick={e => {
                        if (option.disabled) return;
                        e.preventDefault();
                        onSelectHandler(option.id);
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
      </DropdownContainerDiv>
    </div>
  );
}

const MultiSelectContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MultiSelectLabelDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.125rem;
  align-items: center;

  padding: 0.0625rem 0.3rem 0.0625rem 0.5rem;

  background: var(--rothko-dropdown-multiselect-background, #fff);
  border: 1px solid var(--rothko-dropdown-multiselect-text, #000);

  border-radius: 3.25rem;
  cursor: initial;
`;

const MultiSelectItemText = styled(Typography.bodySmall)`
  margin: 0;
  user-select: none;
  color: var(--rothko-dropdown-multiselect-text, #000);
`;

const NoResultsText = styled(ItemText).attrs({ as: 'p' })`
  text-align: center;
  padding: 1rem;
`;

const PhantomInput = styled.input`
  ${hideChromeBrowserOutline}
  ${textStyle}
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
