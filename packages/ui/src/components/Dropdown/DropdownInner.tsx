import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';
import { classes, isArray, isNil } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import useDropdownMenu from '../../library/hooks/useMenu';
import { PhantomButton } from '../../library/PhantomButton';
import { DefaultRenderOption } from '../../library/RenderOption';
import { hideChromeBrowserOutline } from '../../library/Styles';
import type { Value } from '../../library/types';
import { directionMap } from '../../library/utils/keyUtils';
import Typography, { bodySizeStyle, paragraphStyle } from '../Typography/Typography';
import { ControlButton, DropdownContainerDiv, DropdownMenu, TextContainerDiv } from './Shared';
import type { DropdownInnerProps } from './types';
import useSelect from './useSelect';
import useId from '../../library/hooks/useId';
import ItemText from '../../library/ItemText';
import LabelText from '../../library/LabelText';
import { vuar } from '../../library/utils/vuar';

// TODO - Think about aria role for searachable dropdown?

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
  onDelete,
  onFocus,
  onOpen,
  options: optionsRaw,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  search,
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
  const dropdownMenuId = useId();
  const labelId = useId();
  const errorMessageId = useId();

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

  // TODO: add these to the menu hook...
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
  }, [optIdx, openReverse, open, scrollIntoView, options.length]);

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
      <DropdownContainerDiv
        id={id}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-disabled={ariaDisabled}
        aria-errormessage={
          !ariaErrorMessage && error && errorText ? errorMessageId : ariaErrorMessage
        }
        aria-controls="dropdown-list-id-both-container-and-ul?" // when expanded
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        role={search ? 'combobox' : undefined} // multi isn't searchable tho? undefined?
        aria-haspopup={search ? 'listbox' : undefined}
        aria-expanded={open}
        ref={containerRef}
        className={containerClasses}
        onBlur={onBlurHandler}
        onClick={openDropdownMenu}
        onFocus={onFocusHandler}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        tabIndex={0}
      >
        {search && !disabled && (
          <PhantomInput
            aria-autocomplete="list"
            aria-controls="dropdown-list"
            onChange={e => setQuery(e.target.value)}
            type="text"
            aria-label="Search"
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
          {!hasValue && (!query || !hasOptions) && <ItemText $placeHolder>{placeholder}</ItemText>}
          {!isNil(value) && isArray(value) && (
            <MultiSelectContainerDiv>
              {value.map(v => {
                const opt = optionLookup[v];
                return (
                  <MultiSelectLabelDiv tabIndex={-1} key={opt.id}>
                    <MultiSelectItemText>{opt.label}</MultiSelectItemText>
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
                  </MultiSelectLabelDiv>
                );
              })}
            </MultiSelectContainerDiv>
          )}
          {!multiple && !isNil(value) && !isArray(value) && (
            <ItemText>{optionLookup[value].label}</ItemText>
          )}
        </TextContainerDiv>
        {!canClear ? (
          <ControlButton
            $open={open}
            $rotateOnOpen
            aria-label="Open"
            disabled={disabled}
            onClick={toggleMenu}
          >
            <ChevronDownOutline aria-hidden width="1rem" height="1rem" />
          </ControlButton>
        ) : (
          <ControlButton
            aria-label="Clear Selection"
            disabled={disabled}
            onClick={() => onSelectHandler(null)}
          >
            <CloseOutline aria-hidden width="1rem" height="1rem" />
          </ControlButton>
        )}
        {open && (
          <DropdownMenu
            id={dropdownMenuId}
            role={search ? 'listbox' : undefined}
            ref={menuRef}
            $reverse={openReverse}
            tabIndex={-1}
            data-rothko-body-scroll-lock-ignore
          >
            {!hasOptions ? (
              <NoResultsText>{noResultsMessage}</NoResultsText>
            ) : (
              <ul
                aria-multiselectable={multiple}
                aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
                role={!search ? 'listbox' : undefined}
                tabIndex={-1}
              >
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
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
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

  background: ${vuar({
    element: 'dropdown-multiselect',
    category: 'background',
    fallback: '#fff',
  })};

  border: 1px solid
    ${vuar({
      element: 'dropdown-multiselect',
      category: 'border',
      fallback: '#000',
    })};

  border-radius: 3.25rem;
  cursor: initial;
`;

const MultiSelectItemText = styled(Typography.bodySmall)`
  margin: 0;
  user-select: none;
  color: ${vuar({
    element: 'dropdown-multiselect',
    category: 'foreground',
    fallback: '#000',
  })};
`;

const NoResultsText = styled(ItemText).attrs({ as: 'p' })`
  text-align: center;
  padding: 1rem;
`;

const PhantomInput = styled.input`
  ${hideChromeBrowserOutline}
  ${paragraphStyle}
  ${bodySizeStyle}
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
