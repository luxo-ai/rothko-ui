import React from 'react';
import { Input } from '@rothko-ui/ui';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
  onQueryChange: (q: string) => void;
  placeholder?: string;
  query: string;
};

const SearchBar = ({ onQueryChange, placeholder, query }: SearchBarProps) => {
  return (
    <form role="search" tabIndex={-1}>
      <Input
        className={styles['searchbox']}
        onChange={e => onQueryChange(e.target.value)}
        placeholder={placeholder}
        tabIndex={0}
        type="text"
        value={query}
        role="searchbox"
      />
    </form>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
