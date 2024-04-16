import type { Nilable } from '@rothko-ui/utils';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { phantomInputStyle } from '../../library/PhantomInput';
import { baseInputStyle } from '../Input/styles';
import typographyStyles from '../Typography/styles';
import SearchButton from './SearchButton';

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
  query: Nilable<string>;
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
        <SearchInput
          disabled={disabled}
          onChange={e => onQueryChange(e.target.value)}
          onClick={onClick}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={inputRef}
          tabIndex={0}
          type="text"
          value={query || ''}
        />
        <SearchButton disabled={disabled || !query} onClick={() => onSubmit()} />
        {children}
      </SearchForm>
    );
  }
);

SearchBar.displayName = 'SearchBar';

const SearchForm = styled.form`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle} // causing issues before, this helped
  position: relative;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  width: 100%;
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 0.125rem;

  &.error:not(:focus):not(.focus) {
    // background: ??
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.8;

    > input,
    button {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
  position: relative;
`;

const SearchInput = styled.input`
  ${typographyStyles.body}
  ${phantomInputStyle}
  ${typographyStyles.lightFontStyle}
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;

  &,
  > p,
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default SearchBar;
