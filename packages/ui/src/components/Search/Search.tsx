import { classes } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../layout';
import { useDebuggerContext } from '../../library/DebuggerContext';
import { DefaultRenderOption } from '../../library/RenderOption';
import useDropdownMenu from '../../library/hooks/useMenu';
import type { FocusHandler, Option, RenderOption, Value } from '../../library/types';
import { directionMap } from '../../library/utils/keyUtils';
import SearchBar from './SearchBar';
import type { OptionFetcher } from './useSearch';
import { useSearch } from './useSearch';
import Menu from '../../library/Menu';
import { vuar } from '../../library/utils/vuar';

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
};

function Search<V extends Value, T = undefined>({
  className,
  dataFetcher,
  disabled,
  onBlur,
  onFocus,
  onOpen,
  onSearch: onSearchProp,
  optionLimit: limit,
  placeholder = 'Search...',
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

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectOption(option);
    }

    if (code === keyboardKey.Escape) {
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

  useEffect(() => {
    scrollIntoView(`#option-${optIdx}`);
  }, [optIdx, scrollIntoView]);

  const formClasses = classes(className, {
    error,
    loading,
    disabled,
    focus,
  });

  return (
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
        {open && hasOptions && (
          <SearchMenu ref={menuRef} tabIndex={-1}>
            <ul role="listbox" tabIndex={-1}>
              {options.map((option, idx) => {
                const selected = optIdx === idx;
                return (
                  <li
                    aria-disabled={false}
                    aria-label={option.label}
                    aria-selected={selected}
                    className={classes({ selected })}
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
          </SearchMenu>
        )}
      </SearchBar>
    </Container>
  );
}

const SearchMenu = styled(Menu)`
  max-height: 20rem;
  z-index: 10;
  background-color: ${vuar({ category: 'background', element: 'search', fallback: '#141414' })};

  & li {
    padding: 1rem;
    &:hover,
    &:focus,
    &.selected {
      background-color: ${vuar({
        category: 'background',
        element: 'search-option',
        focused: true,
        fallback: '#eee',
      })};
    }
  }
`;

export default Search;
