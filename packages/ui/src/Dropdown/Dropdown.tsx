import { ChevronDownOutline, CloseOutline } from '@aemiko/icons';
import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../Button/PhantomButton';
import useMenu from '../Library/Hooks/useMenu';
import { DefaultRenderOption } from '../Library/RenderOption';
import { FocusHandler, Option, RenderOption, Value } from '../Library/types';
import { useTheme } from '../Theme';
import { ThemedElement } from '../Theme/types';
import { directionMap } from '../utils/keyUtils';
import { debugFactory } from '../utils/utils';
import {
  ControlContainer,
  DropdownContainer,
  DropdownMenu,
  ItemText,
  LabelText,
  PhantomInput,
  TextContainer,
} from './Common';
import { QueryMatchFn } from './types';
import useSelect from './useSelect';

const debug = debugFactory('dropdown');

type DropdownProps<V extends Value, T> = {
  /** Current value of dropdown or value array if multiple */
  value?: V | V[] | null;
  /** placeholder in input */
  placeholder?: string;
  /** dropdown options */
  options: Option<V, T>[];
  /** event handler for value change */
  onChange: (v: V | V[] | null) => void;
  /** onOpen handler */
  onOpen?: () => void;
  /** onBlur handler  */
  onBlur?: FocusHandler;
  /** onFocus handler */
  onFocus?: FocusHandler;
  /** callback triggered on deletion */
  onDelete?: (v: V) => void;
  /** can you clear the selection */
  clearable?: boolean;
  /** whether or not to close dropdown on ESC (escape) */
  closeOnEsc?: boolean;
  /** is the dropdown disabled */
  disabled?: boolean;
  /** did an error occurr. alert user when true */
  error?: boolean;
  /** are options currently loading? */
  loading?: boolean;
  /** are multiple selections allowed? (value is array) */
  multiple?: boolean;
  /** flag indicating if you can search for options or custom matcher */
  search?: boolean | QueryMatchFn<V, T>;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, T>;
  /** Message to display when there are no results. */
  noResultsMessage?: React.ReactNode;
  /* class names of outer wrapper */
  className?: string;
  /** if the dropdown has a label */
  label?: string;
  /** open dropdown in reverse */
  openReverse?: boolean;
  /** is this a minimal dropdown */
  minimal?: boolean;
  /** prefix of a selected item */
  selectedPrefix?: string;
};

export function Dropdown<V extends Value, T = undefined>({
  value,
  options: optionsRaw,
  onChange,
  onBlur,
  onFocus,
  onDelete,
  onOpen,
  clearable,
  closeOnEsc = true,
  disabled,
  error,
  loading,
  multiple,
  search,
  className,
  minimal,
  renderOption: RenderOpt = DefaultRenderOption,
  placeholder = 'Select',
  noResultsMessage = 'No results',
  selectedPrefix = '',
  label,
  openReverse,
}: DropdownProps<V, T>) {
  const { theme } = useTheme();

  const {
    query,
    optIdx,
    optionLookup,
    options,
    selectOne,
    deleteOne,
    moveOptionIdx,
    setQuery,
    reset,
  } = useSelect({
    options: optionsRaw,
    onChange,
    onDelete,
    value,
    multiple,
    search,
    openReverse,
  });

  const {
    containerRef,
    menuRef,
    open,
    focus,
    openMenu,
    closeMenu,
    scrollIntoView,
    onFocusHandler,
    onBlurHandler,
  } = useMenu({
    onBlur,
    onFocus,
    onOpen,
    disabled,
  });

  const hasOptions = Boolean(options.length);
  const canClear = clearable && !isNil(value) && (!isArray(value) || value.length > 0);

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
    containerRef.current?.focus();
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
      if (!closeOnEsc) return;
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
  }, [optIdx, options.length, openReverse, open]);

  const containerClasses = clsx({
    error,
    loading,
    disabled,
    focus,
    minimal,
    empty: !hasOptions,
  });

  const dropdownClasses = clsx({
    ['open-reverse']: openReverse,
  });

  return (
    <div className={className}>
      {label && <LabelText kind="black">{label}</LabelText>}
      <DropdownContainer
        ref={containerRef}
        tabIndex={0}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={openDropdownMenu}
        onKeyDown={onKeyDown}
        aemikoTheme={theme}
        className={containerClasses}
      >
        {search && !disabled && (
          <PhantomInput
            onChange={e => setQuery(e.target.value)}
            type="text"
            tabIndex={0}
            value={open ? query ?? '' : ''}
            className={clsx({ disabled })}
          />
        )}
        <TextContainer
          className={clsx({ hidden: query?.length, disabled, multiple })}
          tabIndex={-1}
        >
          {(isNil(value) || (isArray(value) && !value.length)) && !query && (
            <ItemText className="placeholder">{placeholder}</ItemText>
          )}
          {!isNil(value) && isArray(value) && (
            <MultiSelectContainerDiv>
              {value.map(v => {
                const opt = optionLookup[v];
                return (
                  <MultiSelectItem
                    tabIndex={-1}
                    key={opt.id}
                    aemikoTheme={theme}
                    className={clsx({ open })}
                  >
                    <RenderOpt option={opt} />
                    <PhantomButton
                      style={{ marginBottom: -3 }}
                      type="button"
                      tabIndex={-1}
                      onClick={() => {
                        deleteOne(opt.id);
                        containerRef.current?.focus();
                      }}
                    >
                      <CloseOutline fill="#281D75" width={16} height={16} />
                    </PhantomButton>
                  </MultiSelectItem>
                );
              })}
            </MultiSelectContainerDiv>
          )}
          {!multiple && !isNil(value) && !isArray(value) && (
            <ItemText>
              {selectedPrefix}
              {optionLookup[value].label}
            </ItemText>
          )}
        </TextContainer>
        {!canClear ? (
          <ControlContainer className={clsx({ open, disabled })} onClick={toggleMenu}>
            <ChevronDownOutline width="1rem" height="1rem" />
          </ControlContainer>
        ) : (
          <ControlContainer className="open" onClick={() => onSelectHandler(null)}>
            <CloseOutline width="1.2rem" height="1.2rem" />
          </ControlContainer>
        )}
        {open && (
          <DropdownMenu
            ref={menuRef}
            id="dropdown-menu"
            tabIndex={-1}
            className={dropdownClasses}
            data-aemiko-body-scroll-lock-ignore
          >
            {!hasOptions ? (
              <NoResultsText>{noResultsMessage}</NoResultsText>
            ) : (
              <ul role="listbox" tabIndex={-1}>
                {options.map((option, idx) => {
                  const selected = optIdx === idx;
                  return (
                    <li
                      className={clsx('option', { selected })}
                      id={`option-${idx}`}
                      key={option.id}
                      role="option"
                      aria-disabled={false}
                      aria-label={option.label}
                      aria-selected={selected}
                      tabIndex={-1}
                      onClick={e => {
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
      </DropdownContainer>
    </div>
  );
}

const MultiSelectContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MultiSelectItem = styled.div<ThemedElement>`
  opacity: 1;
  display: flex;
  flex-direction: row;
  gap: 0.125rem;
  align-items: center;
  padding: 0.0625rem 0.3rem 0.0625rem 0.5rem;
  // padding: 0.125rem 0.3rem 0.125rem 0.5rem;
  // margin: 0 0.25rem;
  background-color: ${({ aemikoTheme }) => aemikoTheme['info-transparent-100']};
  border: 1px solid ${({ aemikoTheme }) => aemikoTheme['info-500']};
  & > p {
    color: ${({ aemikoTheme }) => aemikoTheme['info-600']} !important;
  }
  border-radius: 3.25rem; // 0.25rem;
  cursor: initial;
`;

const NoResultsText = styled(ItemText)`
  text-align: center;
  padding: 1rem;
`;
