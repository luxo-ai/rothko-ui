import type { Nullable } from '@rothko-ui/utils';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { hideBrowserOutline } from '../../Typography';
import { BODY_FONT_FAMILY } from '../../Typography/constants';
import SearchButton from './SearchButton';
import styles from './styles';

type SearchBarProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  focusOnMount?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLElement, Element>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement, Element>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onQueryChange: (q: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  query: Nullable<string>;
};

const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (
    {
      children,
      className,
      disabled,
      focusOnMount,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onQueryChange,
      onSubmit,
      placeholder,
      query,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (focusOnMount) {
        inputRef.current?.focus();
      }
    }, [focusOnMount]);

    return (
      <SearchForm
        ref={ref}
        role="search"
        tabIndex={-1}
        className={className}
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <PhantomInput
          ref={inputRef}
          type="text"
          className={clsx({ disabled })}
          disabled={disabled}
          tabIndex={0}
          placeholder={placeholder}
          onChange={e => onQueryChange(e.target.value)}
          value={query ?? ''}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
        <SearchButton disabled={disabled || !query} onClick={() => onSubmit()} />
        {children}
      </SearchForm>
    );
  }
);

SearchBar.displayName = 'SearchBar';

const SearchForm = styled.form`
  ${styles.searchBarWrapperStyle};
  position: 'relative';
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);
`;

const PhantomInput = styled.input`
  ${hideBrowserOutline}
  font-size: 1rem;
  font-family: ${BODY_FONT_FAMILY.light};
  background: none !important;
  border: none !important;
  outline: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  cursor: text;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

export default SearchBar;
