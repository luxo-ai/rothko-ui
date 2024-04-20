import React from 'react';
import styled from 'styled-components';
import { baseInputStyle } from '../components/Input/styles';
import typographyStyles from '../components/Typography/styles';
import { hideChromeBrowserOutline } from './Styles';

// NOTE:  THIS IS JUST EXPORTED FOR THE DEMO SITE !!!!!!!!!!!!!!!!

type SearchBarProps = {
  onQueryChange: (q: string) => void;
  placeholder?: string;
  query: string;
};

const SearchBar = ({ onQueryChange, placeholder, query }: SearchBarProps) => {
  return (
    <SearchForm role="search" tabIndex={-1}>
      <SearchInput
        onChange={e => onQueryChange(e.target.value)}
        placeholder={placeholder}
        tabIndex={0}
        type="text"
        value={query}
      />
    </SearchForm>
  );
};

const SearchForm = styled.form`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle}
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
`;

const SearchInput = styled.input`
  ${hideChromeBrowserOutline}
  ${typographyStyles.body}
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
  //   padding: 0.5rem 1rem 0.5rem 1rem;
  cursor: text;
`;

export default SearchBar;
