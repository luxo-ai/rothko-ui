import { SearchOutline } from '@rothko-ui/icons';
import type { Nullable } from '@rothko-ui/utils';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { PhantomButton } from '../Button/PhantomButton';
import { hideBrowserOutline } from '../Typography';
import { BODY_FONT_FAMILY } from '../Typography/constants';
import { useTheme } from '../Theme';
import type { ThemedElement } from '../Theme/types';

type SearchBarProps = {
  className?: string;
  disabled?: boolean;
  focusOnMount?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onQueryChange: (q: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  query: Nullable<string>;
};

export const SearchBar = ({
  className,
  disabled,
  focusOnMount,
  onClick,
  onKeyDown,
  onQueryChange,
  onSubmit,
  placeholder,
  query,
}: SearchBarProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusOnMount) {
      inputRef.current?.focus();
    }
  }, [focusOnMount]);

  return (
    <SearchForm
      role="search"
      tabIndex={-1}
      aemikoTheme={theme}
      className={className}
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <PhantomInput
        ref={inputRef}
        type="text"
        aemikoTheme={theme}
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
    </SearchForm>
  );
};

type DummySearchBarProps = Pick<
  SearchBarProps,
  'query' | 'onSubmit' | 'onClick' | 'disabled' | 'placeholder' | 'className'
>;

export const DummySearchBar = ({
  query,
  onSubmit,
  onClick,
  disabled,
  placeholder,
  className,
}: DummySearchBarProps) => {
  const { theme } = useTheme();
  return (
    <DummyWrapper className={clsx('bg-white', className)} aemikoTheme={theme}>
      <PhantomInput
        type="text"
        aemikoTheme={theme}
        disabled={disabled}
        tabIndex={-1}
        placeholder={placeholder}
        value={query ?? ''}
        className={clsx({ disabled })}
        onClick={onClick}
        readOnly
      />
      <SearchButton disabled={disabled || !query} onClick={() => onSubmit()} />
    </DummyWrapper>
  );
};

type SearchButtonProps = {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchButton = ({ onClick, disabled }: SearchButtonProps) => {
  const { theme } = useTheme();
  return (
    <SearchButtonBase type="submit" aemikoTheme={theme} disabled={disabled} onClick={onClick}>
      <SearchOutline width="1.5rem" height="1.5rem" />
    </SearchButtonBase>
  );
};

const searchBarWrapperStyle = css<ThemedElement>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;

  background: white;

  &:not(.bg-white) {
    background: ${({ aemikoTheme }) => aemikoTheme['basic-200']};
  }

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  font-family: ${BODY_FONT_FAMILY.light};
  line-height: 20px;

  border: 2px solid black; // ${({ aemikoTheme }) => aemikoTheme['basic-500']};
  border-radius: 0.125rem; // 2rem; //0.25rem;

  &.b-radius-bold {
    border-radius: 0.25rem;
  }

  &.error:not(:focus):not(.focus) {
    background: ${({ aemikoTheme }) => aemikoTheme['danger-transparent-100']};
    border-color: ${({ aemikoTheme }) => aemikoTheme['danger-500']};
  }

  &.focus:not(.disabled),
  &:focus:not(.disabled),
  &:active:not(.disabled) {
    outline: none;
    // border-color: ${({ aemikoTheme }) => aemikoTheme['basic-800']};
  }

  &.disabled {
    cursor: not-allowed;
    background: ${({ aemikoTheme }) => aemikoTheme['basic-transparent-200']};
    border-color: ${({ aemikoTheme }) => aemikoTheme['basic-transparent-500']};
    & > input,
    button {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
`;

const SearchForm = styled.form<ThemedElement>`
  ${searchBarWrapperStyle};
`;

const DummyWrapper = styled.div<ThemedElement>`
  ${searchBarWrapperStyle}
`;

const SearchButtonBase = styled(PhantomButton)<ThemedElement>`
  padding: 0.5rem;
  margin: 0;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  background-image: none;
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: auto;
  :active:not(:disabled) {
    background-color: black; // ${({ aemikoTheme }) => aemikoTheme['info-transparent-500']};
    & > svg {
      fill: white;
    }
  }
`;

const PhantomInput = styled.input<ThemedElement>`
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
`;
