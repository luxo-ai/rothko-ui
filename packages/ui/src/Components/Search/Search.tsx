import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout';
import { useDebuggerContext } from '../../Library/DebuggerContext';
import useDropdownMenu from '../../Library/Hooks/useMenu';
import { DefaultRenderOption } from '../../Library/RenderOption';
import type { FocusHandler, Option, RenderOption, Value } from '../../Library/types';
import { directionMap } from '../../utils/keyUtils';
import { LabelText } from '../Dropdown/Common';
import DummySearchBar from './SearchBar/DummySearchBar';
import SearchBar from './SearchBar/SearchBar';
import SearchPopout from './SearchPopout';
import type { OptionFetcher } from './useSearch';
import { useSearch } from './useSearch';

type SearchMode = 'dropdown' | 'popout';

const isPopoutMode = (mode: SearchMode) => {
  return mode === 'popout';
};

type SearchProps<V extends Value, T> = {
  /** function for fetching data async */
  dataFetcher?: OptionFetcher<V, T>;
  /** callback triggered on search */
  onSearch: (query: string, id?: V) => void;
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
  /* type of search experience */
  mode?: SearchMode;
  /* header of the search (logo, etc) when in popout mode */
  popoutHeader?: React.ReactElement;
  /* opt into traditional search drop-down style */
  traditionalUx?: boolean;
  /** if the dropdown has a label */
  label?: string;
  /** initial query value */
  initialQuery?: string;
};

function Search<V extends Value, T = undefined>({
  className,
  closeOnEsc = true,
  dataFetcher,
  disabled,
  initialQuery,
  label: labelProp,
  mode = 'dropdown',
  onBlur,
  onFocus,
  onOpen,
  onSearch: onSearchProp,
  optionLimit: limit,
  placeholder = 'Search...',
  popoutHeader,
  renderOption: RenderOpt = DefaultRenderOption,
}: SearchProps<V, T>) {
  const debug = useDebuggerContext('<Search />');

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
  } = useDropdownMenu({
    onBlur,
    onFocus,
    onOpen,
    disabled,
  });

  const showPopout = isPopoutMode(mode) && open;
  const hasOptions = Boolean(options.length);

  const onSearch = useCallback(
    (q: string, id?: V) => {
      onSearchProp(q, id);
      closeMenu();
    },
    [onSearchProp, closeMenu]
  );

  const onSelectOption = useCallback(
    (option: Option<V, T>) => {
      setQuery(option.label);
      onSearch(option.label, option.id);
    },
    [onSearch, setQuery]
  );

  const onSubmitQuery = useCallback(() => {
    if (!query) return;
    onSearch(query);
  }, [query, onSearch]);

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

    if (code === keyboardKey.Enter && !isPopoutMode(mode)) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectOption(option);
    }

    if (code === keyboardKey.Escape && !isPopoutMode(mode)) {
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

  const label = useMemo(() => {
    if (!labelProp) return null;
    return <LabelText>{labelProp}</LabelText>;
  }, [labelProp]);

  const dropdownResults = useMemo(() => {
    if (!open || !hasOptions) return null;
    return (
      <DropdownMenu
        ref={menuRef}
        tabIndex={-1}
        className={clsx({
          ['pop-out']: showPopout,
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
  }, [open, hasOptions, menuRef, showPopout, options, optIdx, RenderOpt, onSelectOption, setQuery]);

  useEffect(() => {
    // if (mobile) return;
    scrollIntoView(`#option-${optIdx}`);
  }, [optIdx]);

  const formClasses = clsx(className, {
    error,
    loading,
    disabled,
    focus,
  });

  if (isPopoutMode(mode)) {
    return (
      <>
        {label}
        <DummySearchBar
          className={formClasses}
          onSubmit={onSubmitQuery}
          onClick={() => openMenu()}
          disabled={disabled}
          placeholder={placeholder}
          activeText={initialQuery}
        />
        <SearchPopout
          ref={containerRef}
          setQuery={setQuery}
          query={query}
          onSubmit={onSubmitQuery}
          isOpen={open}
          onClose={() => closeMenu()}
          header={popoutHeader}
        >
          {dropdownResults}
        </SearchPopout>
      </>
    );
  }

  return (
    <>
      {label}
      <Container
        ref={containerRef}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        position="relative"
      >
        <SearchBar
          className={formClasses}
          onSubmit={onSubmitQuery}
          onKeyDown={onKeyDown}
          onClick={() => openMenu()}
          query={query}
          onQueryChange={setQuery}
          placeholder={placeholder}
          disabled={disabled}
        >
          {dropdownResults}
        </SearchBar>
      </Container>
    </>
  );
}

const DropdownMenu = styled.div`
  width: 100%;
  z-index: 10;
  background-color: var(--color-background, #fff); // var(
  // --dropdown-multiselect-background,
  // transparent
  // ); // var(--basic-transparent-100, white);
  top: calc(100% + 0.25rem);
  left: 0;

  &:not(.pop-out) {
    position: absolute;
    max-height: 30rem;
    overflow-y: scroll;
    border-radius: 0.125rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }

  &.pop-out {
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
        background-color: var(--dropdown-background-selected, #eeeeee);
      }
    }
  }
`;

export default Search;
