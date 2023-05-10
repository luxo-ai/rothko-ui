import { CloseOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Grid } from '../../Layout/Grid';
import { ShadedBackdrop } from '../../Library/Common';
import { PhantomButton } from '../../Library/PhantomButton';
import { DomPortal } from '../../Library/Portal';
import { addEvent, disableBodyScroll, enableBodyScroll, removeEvent } from '../../utils/domUtils';
import SearchBar from './SearchBar/SearchBar';

type SearchPopoutProps = {
  children: React.ReactNode;
  header?: React.ReactElement;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  query?: string | null;
  setQuery: (q: string) => void;
};

const SearchPopout = React.forwardRef<HTMLDivElement, SearchPopoutProps>(
  ({ children, header, isOpen, onClose, onSubmit, query, setQuery }, ref) => {
    const searchPopoutRef = useRef<HTMLDivElement | null>(null);

    const onCloseLocal = useCallback(() => {
      if (searchPopoutRef.current) {
        enableBodyScroll(searchPopoutRef.current);
      }
      onClose();
    }, [onClose, searchPopoutRef.current]);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!searchPopoutRef.current || !searchPopoutRef.current.contains(e.target as Node)) {
        onCloseLocal();
      }
    };

    useEffect(() => {
      if (searchPopoutRef.current) {
        disableBodyScroll(searchPopoutRef.current);
      }
    }, [isOpen, searchPopoutRef]);

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
        <ShadedBackdrop className={clsx({ ['backdrop-open']: isOpen })} onClick={onBackdropClick}>
          {isOpen && (
            <FullScreenContainerDiv ref={searchPopoutRef}>
              <Grid marginBottom="1rem" padding="0 1rem" gridTemplateColumns="1.75rem 1fr 1.75rem">
                <PhantomButton onClick={() => onCloseLocal()}>
                  <CloseOutline width="1.75rem" height="1.75rem" />
                </PhantomButton>
                {header && <HeaderContainerDiv>{header}</HeaderContainerDiv>}
              </Grid>
              <SearchBarContainerDiv ref={ref}>
                <SearchBar
                  //   className={formClasses}
                  onSubmit={onSubmit}
                  query={query}
                  onQueryChange={setQuery}
                  // placeholder={placeholder}
                  //   disabled={disabled}
                  focusOnMount
                />
              </SearchBarContainerDiv>
              {children}
            </FullScreenContainerDiv>
          )}
        </ShadedBackdrop>
      </DomPortal>
    );
  }
);

SearchPopout.displayName = 'SearchPopout';

const HeaderContainerDiv = styled.div`
  margin: 0 auto;
`;

const SearchBarContainerDiv = styled.div`
  padding: 0 1rem 1rem 1rem;
  border-bottom: 1px solid var(--rothko-border, #000);
`;

const FullScreenContainerDiv = styled.div`
  z-index: 999;

  background: var(--rothko-background, #fff);
  margin: 2rem auto;
  //  height: calc(100% - 2 * 2rem - 2 * 1.5rem);
  display: block;
  padding: 1.5rem 0;
  max-width: 700px;
  width: 100%;
  overflow: hidden;

  @media only screen and (max-width: 700px) {
    margin: auto;
    height: 100%;
    // important helps w mobile issues
    display: flex;
    flex-direction: column;
  }
`;

export default SearchPopout;
