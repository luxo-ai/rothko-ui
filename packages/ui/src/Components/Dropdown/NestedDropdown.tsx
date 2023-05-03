import { ChevronDownOutline, ChevronRightOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import isNil from 'lodash/isNil';
import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useDebuggerContext } from '../../Library/DebuggerContext';
import useDropdownMenu from '../../Library/Hooks/useMenu';
import { DefaultRenderOption } from '../../Library/RenderOption';
import type { FocusHandler, NestedOption, Option, RenderOption, Value } from '../../Library/types';
import { directionMap } from '../../utils/keyUtils';
import BackLinkButton from '../Button/BackLinkButton';
import Typography from '../Typography';
import {
  ControlContainer,
  DropdownContainerDiv,
  DropdownMenu,
  ItemText,
  LabelText,
  TextContainerDiv,
} from './Common';
import type { StackOption } from './useNestedOptions';
import useNestedOptions from './useNestedOptions';

type NestedDropdownProps<V extends Value, T> = {
  id?: string;
  /** Current value of dropdown or value array if multiple */
  value?: V | null;
  /** placeholder in input */
  placeholder?: string;
  /** dropdown options */
  options: NestedOption<V>[];
  /** event handler for value change */
  onChange: (v: V | null) => void;
  /** onBlur handler  */
  onBlur?: FocusHandler;
  /** onOpen handler */
  onOpen?: () => void;
  /** onFocus handler */
  onFocus?: FocusHandler;
  /** whether or not to close dropdown on ESC (escape) */
  closeOnEsc?: boolean;
  /** is the dropdown disabled */
  disabled?: boolean;
  /** did an error occurr. alert user when true */
  error?: boolean;
  /** are options currently loading? */
  loading?: boolean;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, { hasMore: boolean }>;
  /* class names of outer wrapper */
  className?: string;
  /** if the dropdown has a label */
  label?: string;
};

export function NestedDropdown<V extends Value, T = undefined>({
  id,
  value,
  options,
  onChange,
  onBlur,
  onFocus,
  onOpen,
  closeOnEsc = true,
  disabled,
  error,
  loading,
  className,
  renderOption: RenderOpt = DefaultRenderOption,
  placeholder = 'Select',
  label,
}: NestedDropdownProps<V, T>) {
  const debug = useDebuggerContext('<NestedDropdown />');

  const {
    currentOptions,
    canGoToPrevCategory,
    optIdx,
    title,
    selectOne,
    goToPrevCategory,
    moveOptionIdx,
    reset,
  } = useNestedOptions({ options, onChange });

  const {
    containerRef,
    menuRef,
    focus,
    open,
    openMenu,
    closeMenu,
    scrollIntoView,
    onBlurHandler,
    onFocusHandler,
  } = useDropdownMenu({
    onFocus,
    onBlur,
    onOpen,
    disabled,
  });

  const pathToCurrentOption = useMemo(
    () => (!isNil(value) ? findPathToOptionMatch(value, options) : []),
    [value, options]
  );

  const onSelect = (option: StackOption<V>) => {
    const { hasMore } = option.data;
    selectOne(option);
    if (!hasMore) {
      closeMenu();
      reset();
    }
  };

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openMenu();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    debug('onKeydown');
    const code = keyboardKey.getCode(e);
    if (!code) return;
    // event only happens if the menu is not open
    if (code === keyboardKey.Spacebar) {
      e.preventDefault();
      if (!open) openMenu();
      return;
    }
    // these keydown events only happen when the menu is open
    if (!open) return;
    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > currentOptions.length - 1) return;
      const option = currentOptions[optIdx];
      return onSelect(option);
    }
    if (code === keyboardKey.Escape) {
      if (!closeOnEsc) return;
      e.preventDefault();
      return closeMenu();
    }
    const direction = directionMap[code];
    if (!direction) return;
    e.preventDefault();
    moveOptionIdx(direction);
  };

  useEffect(() => {
    if (!open) return;
    const scrollIdx = optIdx < 0 ? 0 : optIdx;
    scrollIntoView(`#option-${scrollIdx}`);
  }, [optIdx, optIdx, open]);

  const hasOptions = Boolean(options.length);

  const containerClasses = clsx({
    error,
    loading,
    disabled,
    focus,
    empty: !hasOptions,
  });

  return (
    <div className={className}>
      {label && <LabelText>{label}</LabelText>}
      <DropdownContainerDiv
        id={id}
        ref={containerRef}
        tabIndex={0}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={openMenu}
        onKeyDown={onKeyDown}
        className={containerClasses}
      >
        <TextContainerDiv className={clsx({ disabled })} tabIndex={-1}>
          {isNil(value) && <ItemText className="placeholder">{placeholder}</ItemText>}
          {!isNil(value) && (
            <ItemText>{pathToCurrentOption.map(o => o.label).join(' / ')}</ItemText>
          )}
        </TextContainerDiv>
        <ControlContainer className={clsx({ open, disabled })} onClick={toggleMenu}>
          <ChevronDownOutline width="1rem" height="1rem" />
        </ControlContainer>
        {open && (
          <DropdownMenu
            ref={menuRef}
            id="dropdown-menu"
            tabIndex={-1}
            data-rothko-body-scroll-lock-ignore
          >
            {canGoToPrevCategory && (
              <ButtonContainerDiv>
                <BackLinkButton
                  onClick={() => {
                    goToPrevCategory();
                    containerRef.current?.focus();
                  }}
                />
              </ButtonContainerDiv>
            )}
            {title && <TitleText>{title}</TitleText>}
            <ul role="listbox" tabIndex={-1}>
              {currentOptions.map((option, idx) => {
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
                      onSelect(option);
                      containerRef.current?.focus();
                    }}
                  >
                    <NestedOptionContainerDiv>
                      <RenderOpt option={option} />
                      {option.data.hasMore && <ChevronRightOutline width="1rem" height="1rem" />}
                    </NestedOptionContainerDiv>
                  </li>
                );
              })}
            </ul>
          </DropdownMenu>
        )}
      </DropdownContainerDiv>
    </div>
  );
}

function findPathToOptionMatch<V extends Value>(value: V, options: NestedOption<V>[]): Option<V>[] {
  for (const option of options) {
    const { subcategories } = option;
    // match found at root
    if (option.id === value) {
      return [option];
    }
    if (subcategories) {
      const subPath = findPathToOptionMatch(value, subcategories);
      if (subPath.length) return [option, ...subPath];
    }
  }
  return [];
}

const menuItemHPadding = css`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ButtonContainerDiv = styled.div`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
`;

const TitleText = styled(Typography.label)`
  padding-top: 1rem;
  padding-bottom: 0.125rem;
  ${menuItemHPadding};
`;

const NestedOptionContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
