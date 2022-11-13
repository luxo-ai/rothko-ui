import { CloseOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../Button/PhantomButton';
import { DomPortal } from '../Library/Portal';
import { addEvent, disableBodyScroll, enableBodyScroll, removeEvent } from '../utils/domUtils';
import { directionMap } from '../utils/keyUtils';
import { debugFactory } from '../utils/utils';
import { DefaultRenderOption } from '../Library/RenderOption';
import type { FocusHandler, Option, RenderOption, Value } from '../Library/types';
import useMenu from '../Library/Hooks/useMenu';
import { DummySearchBar, SearchBar } from './SearchBar';
import type { OptionFetcher } from './useSearch';
import { useSearch } from './useSearch';

const debug = debugFactory('search');

type SearchProps<V extends Value, T> = {
  /** function for fetching data async */
  dataFetcher?: OptionFetcher<V, T>;
  /** callback triggered on search */
  onSearch: (query: string) => void;
  /** placeholder in input */
  placeholder?: string;
  /** onBlur handler  */
  onBlur?: FocusHandler;
  /** onFocus handler */
  onFocus?: FocusHandler;
  /** onOpen handler */
  onOpen?: () => void;
  /** whether or not to close dropdown on ESC (escape) */
  closeOnEsc?: boolean;
  /** is the dropdown disabled */
  disabled?: boolean;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, T>;
  /* class names of outer wrapper */
  className?: string;
  /* [[TODO]]: what should be shown when loading new options */
  renderLoading?: () => JSX.Element;
  /* limit number of results shown in dropdown */
  optionLimit?: number;
  /* is mobile view */
  mobile?: boolean;
  /* header of the search (logo, etc) */
  header?: React.ReactElement;
};

function Search<V extends Value, T = undefined>({
  className,
  closeOnEsc = true,
  dataFetcher,
  disabled,
  header,
  mobile,
  onBlur,
  onFocus,
  onOpen,
  onSearch,
  optionLimit: limit,
  placeholder = 'Search...',
  renderOption: RenderOpt = DefaultRenderOption,
}: SearchProps<V, T>) {
  const { error, loading, moveOptionIdx, optIdx, options, query, setQuery } = useSearch({
    dataFetcher,
    limit,
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
  } = useMenu({
    onBlur,
    onFocus,
    onOpen,
    disabled,
  });

  const fullScreen = mobile && open;
  const hasOptions = Boolean(options.length);

  const onSelectRaw = useCallback(
    (val: string) => {
      onSearch(val);
      closeMenu();
    },
    [onSearch, setQuery, closeMenu]
  );

  const onSelectOption = useCallback(
    (option: Option<V, T>) => {
      onSelectRaw(String(option.id));
      setQuery(option.label);
    },
    [onSelectRaw, setQuery]
  );

  const onSubmit = useCallback(() => {
    if (!query) return;
    onSelectRaw(query);
  }, [query, onSelectRaw]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    debug('onKeydown');
    const code = keyboardKey.getCode(e);
    if (!code) return;

    // event only happens if the menu is not open
    if (code === keyboardKey.Spacebar) {
      // don't prevent default here or space in input won't be picked up
      if (!open) openMenu();
      return;
    }

    // these keydown events only happen when the menu is open
    if (!open) return;

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectOption(option);
    }

    if (code === keyboardKey.Escape && !mobile) {
      if (!closeOnEsc) return;
      e.preventDefault();
      return closeMenu();
    }

    if (code === keyboardKey.Spacebar) {
      e.preventDefault();
      return openMenu();
    }

    const direction = directionMap[code];
    if (!direction) return;
    e.preventDefault();
    moveOptionIdx(direction);
  };

  const dropdownResults = useMemo(() => {
    if (!open || !hasOptions) return null;
    return (
      <DropdownMenu
        ref={menuRef}
        tabIndex={-1}
        className={clsx({
          ['full-screen']: fullScreen,
        })}
      >
        <ul role="listbox" tabIndex={-1}>
          {options.map((option, idx) => {
            const selected = optIdx === idx;
            return (
              <li
                aria-disabled={false}
                aria-label={option.label}
                aria-selected={selected}
                className={clsx('option', { selected })}
                id={`option-${idx}`}
                key={option.id}
                role="option"
                tabIndex={-1}
                onClick={e => {
                  e.preventDefault();
                  setQuery(option.label);
                  onSelectOption(option);
                }}
              >
                <RenderOpt option={option} />
              </li>
            );
          })}
        </ul>
      </DropdownMenu>
    );
  }, [open, hasOptions, menuRef, fullScreen, options, optIdx, RenderOpt, onSelectOption, setQuery]);

  useEffect(() => {
    if (mobile) return;
    scrollIntoView(`#option-${optIdx}`);
  }, [optIdx, mobile]);

  const formClasses = clsx(className, {
    error,
    loading,
    disabled,
    focus,
  });

  if (mobile) {
    return (
      <>
        <DummySearchBar
          className={formClasses}
          query={query}
          onSubmit={onSubmit}
          onClick={() => openMenu()}
          disabled={disabled}
          placeholder={placeholder}
        />
        <FullScreen isOpen={open} onClose={() => closeMenu()} header={header}>
          <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <SearchBar
              className={formClasses}
              onSubmit={onSubmit}
              query={query}
              onQueryChange={setQuery}
              placeholder={placeholder}
              disabled={disabled}
              focusOnMount
            />
            {dropdownResults}
          </div>
        </FullScreen>
      </>
    );
  }

  return (
    <WrapperDiv
      ref={containerRef}
      tabIndex={0}
      style={{ position: 'relative' }}
      /* TODO: not sure if these should be here. this needs some tweaking HANDE FULL ON FOCUS */
      onFocus={e => onFocusHandler(e)}
      onBlur={e => onBlurHandler(e)}
    >
      <SearchBar
        className={clsx('bg-white', formClasses)}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onClick={() => openMenu()}
        query={query}
        onQueryChange={setQuery}
        placeholder={placeholder}
        disabled={disabled}
      />
      {dropdownResults}
    </WrapperDiv>
  );
}

type FullProps = {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactElement;
};

export const FullScreen = ({ isOpen, onClose, children, header }: FullProps) => {
  const fullScreenRef = useRef<HTMLDivElement | null>(null);

  const onCloseLocal = useCallback(() => {
    if (fullScreenRef.current) {
      enableBodyScroll(fullScreenRef.current);
    }
    onClose();
  }, [onClose, fullScreenRef.current]);

  useEffect(() => {
    if (fullScreenRef.current) {
      disableBodyScroll(fullScreenRef.current);
    }
  }, [isOpen, fullScreenRef]);

  useEffect(() => {
    const closeOnEsc = (e: React.KeyboardEvent) => {
      const code = keyboardKey.getCode(e);
      if (!code) return;
      if (code === keyboardKey.Escape) {
        e.preventDefault();
        onCloseLocal();
      }
    };
    addEvent(document.body, 'keydown', closeOnEsc);
    return () => removeEvent(document.body, 'keydown', closeOnEsc);
  }, [onCloseLocal]);

  return (
    <DomPortal wrapperId="search-portal">
      {isOpen && (
        <FullScreenContainerDiv ref={fullScreenRef}>
          <div
            style={{
              /* eventually make this a class */
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              paddingRight: '1rem',
              paddingLeft: '1rem',
            }}
          >
            {/*
             * nb1 since the close button has a 24x24 box
             * around it and causes some issues alligning
             * with the header icon
             */}
            <PhantomButton onClick={() => onCloseLocal()} style={{ marginBottom: '-0.25rem' }}>
              <CloseOutline width="2rem" height="2rem" />
            </PhantomButton>
            {header && (
              <>
                <div>{header}</div>
                <div style={{ width: '2rem' }} />
              </>
            )}
          </div>
          {children}
        </FullScreenContainerDiv>
      )}
    </DomPortal>
  );
};

const DropdownMenu = styled.div`
  top: calc(100% + 0.25rem);
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: white;

  &:not(.full-screen) {
    position: absolute;
    max-height: 30rem;
    overflow-y: scroll;
    border-radius: 0.25rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }
  &.full-screen {
    margin: 1rem 0 2rem 0;
    height: 100%;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;

    &.group-header {
      padding: 1rem;
      cursor: default;
    }

    &.option {
      cursor: pointer;
      padding: 0.75rem 1rem;
      &:hover,
      &:focus,
      &.selected {
        background-color: rgb(238, 238, 238);
      }
    }
  }
`;

const WrapperDiv = styled.div`
  margin: 0;
  padding: 0;
`;

const FullScreenContainerDiv = styled.div`
  overflow: auto;
  position: absolute;
  z-index: 999;
  inset: 0;
  background: white;
  margin: auto;
  display: block;
  padding: 1.5rem 0;
`;

export default Search;
