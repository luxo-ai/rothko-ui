import { ChevronDownOutline, ChevronRightOutline, CloseOutline } from '@rothko-ui/icons';
import { classes, isNil } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ItemText, LabelText } from '../../library/Common';
import { useDebuggerContext } from '../../library/DebuggerContext';
import useDropdownMenu from '../../library/Hooks/useMenu';
import { DefaultRenderOption } from '../../library/RenderOption';
import type { NestedOption, Option, RenderOption, Value } from '../../library/types';
import { directionMap } from '../../utils/keyUtils';
import BackLinkButton from '../Button/BackLinkButton';
import Typography from '../Typography/Typography';
import { ControlButton, DropdownContainerDiv, DropdownMenu, TextContainerDiv } from './Shared';
import type { DropdownInnerProps } from './types';
import type { StackOption } from './useNestedOptions';
import useNestedOptions from './useNestedOptions';

type NestedDropdownProps<V extends Value> = Pick<
  DropdownInnerProps<V, undefined>,
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
  | 'onDelete'
  | 'clearable'
  | 'className'
  | 'disabled'
> & {
  /** Current value of dropdown or value array if multiple */
  value?: V | null;
  /** dropdown options */
  options: NestedOption<V>[];
  /** event handler for value change */
  onChange: (v: V | null) => void;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, { hasMore: boolean }>;
};

function NestedDropdown<V extends Value>({
  className,
  clearable,
  disabled,
  error,
  label,
  menuPosition = 'bottom',
  bordered = true,
  onBlur,
  onChange,
  onFocus,
  onOpen,
  options,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  value,
}: NestedDropdownProps<V>) {
  const debug = useDebuggerContext('<NestedDropdown />');

  const openReverse = menuPosition === 'top';

  const {
    currentOptions,
    canGoToPrevCategory,
    optIdx,
    title,
    selectOne,
    goToPrevCategory,
    moveOptionIdx,
    reset,
  } = useNestedOptions({ options, onChange, reverse: openReverse });

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

  const hasOptions = Boolean(options.length);
  const hasValue = !isNil(value);
  const canClear = clearable && hasValue && !disabled;

  const pathToCurrentOption = useMemo(
    () => (!isNil(value) ? findPathToOptionMatch(value, options) : []),
    [value, options]
  );

  const onSelect = (option: StackOption<V> | null) => {
    selectOne(option);
    if (option === null || !option.data.hasMore) {
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
      // if (!closeOnEsc) return;
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
    const scrollIdx = optIdx < 0 && openReverse ? options.length - 1 : optIdx;
    scrollIntoView(`#option-${scrollIdx}`);
  }, [optIdx, open, openReverse, options.length, scrollIntoView]);

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
    <div className={className}>
      {label && <LabelText>{label}</LabelText>}
      <DropdownContainerDiv
        ref={containerRef}
        tabIndex={0}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={openMenu}
        onKeyDown={onKeyDown}
        className={containerClasses}
      >
        <TextContainerDiv className={classes({ disabled })} tabIndex={-1}>
          {isNil(value) && <ItemText placeHolder>{placeholder}</ItemText>}
          {!isNil(value) && (
            <ItemText>{pathToCurrentOption.map(o => o.label).join(' / ')}</ItemText>
          )}
        </TextContainerDiv>
        {!canClear ? (
          <ControlButton
            $open={open}
            $rotateOnOpen
            aria-label="open nested dropdown"
            className={classes({ disabled })}
            onClick={toggleMenu}
          >
            <ChevronDownOutline width="1rem" height="1rem" />
          </ControlButton>
        ) : (
          <ControlButton
            aria-label="clear item"
            className={classes({ disabled })}
            onClick={() => onSelect(null)}
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
                    className={classes('option', { selected })}
                    id={`option-${idx}`}
                    key={option.id}
                    role="option"
                    aria-disabled={false}
                    aria-label={option.label}
                    aria-selected={selected}
                    tabIndex={-1}
                    onClick={() => {
                      // e.preventDefault();
                      onSelect(option);
                      containerRef.current?.blur();
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

export default NestedDropdown;
