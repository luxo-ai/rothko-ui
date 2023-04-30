import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Container } from '../Container';
import useMenu from '../Library/Hooks/useMenu';
import { DefaultRenderOption } from '../Library/RenderOption';
import type { FocusHandler, Option, RenderOption, Value } from '../Library/types';
import { directionMap } from '../utils/keyUtils';
import { debugFactory } from '../utils/utils';
import { DummySearchBar, SearchBar } from './SearchBar';
import SearchPopout from './SearchPopout';
import type { OptionFetcher } from './useSearch';
import { useSearch } from './useSearch';
// SEARCH SHOULD USE CONTEXT API
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
  /* opt into traditional search drop-down style */
  traditionalUx?: boolean;
};

function Search<V extends Value, T = undefined>({
  className,
  closeOnEsc = true,
  dataFetcher,
  disabled,
  header,
  mobile = true,
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
        <SearchPopout
          setQuery={setQuery}
          query={query}
          onSubmit={onSubmit}
          isOpen={open}
          onClose={() => closeMenu()}
          header={header}
        >
          {dropdownResults}
        </SearchPopout>
      </>
    );
  }

  return (
    <Container
      ref={containerRef}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      position="relative"
    >
      <SearchBar
        className={formClasses}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onClick={() => openMenu()}
        query={query}
        onQueryChange={setQuery}
        placeholder={placeholder}
        disabled={disabled}
      />
      {dropdownResults}
    </Container>
  );
}

const DropdownMenu = styled.div`
  width: 100%;
  z-index: 10;
  background-color: var(--basic-transparent-100, white);
  top: calc(100% + 0.25rem);
  left: 0;

  &:not(.full-screen) {
    position: absolute;
    max-height: 30rem;
    overflow-y: scroll;
    border-radius: 0.25rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }

  &.full-screen {
    margin: 0 0 2rem 0;
    height: 100%;
    overflow-y: scroll;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;
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

export default Search;
