import type { Nullable } from '@rothko-ui/utils';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../../Library/PhantomButton';
import { PhantomInput } from '../../../Library/PhantomInput';
import { MakeMoreCommon } from '../../Dropdown/Common';
import { hideBrowserOutline } from '../../Typography';
import SearchButton from './SearchButton';
import styles from './styles';

type DummySearchBarProps = {
  activeText?: Nullable<string>;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: () => void;
  placeholder?: string;
};

const DummySearchBar = ({
  activeText,
  className,
  disabled,
  onClick,
  onSubmit,
  placeholder,
}: DummySearchBarProps) => (
  <PlaceholderWrapperDiv className={className}>
    <PhantomInput type="text" tabIndex={-1} readOnly visibility="hidden" position="absolute" />
    <IdkButton disabled={disabled} className={clsx({ disabled })} type="button" onClick={onClick}>
      {(activeText || placeholder) && (
        <MakeMoreCommon light placeHolder={!activeText}>
          {activeText || placeholder}
        </MakeMoreCommon>
      )}
    </IdkButton>
    <SearchButton disabled={disabled || !activeText} onClick={() => onSubmit()} />
  </PlaceholderWrapperDiv>
);

const PlaceholderWrapperDiv = styled.div`
  ${styles.searchBarWrapperStyle}
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);
`;

const IdkButton = styled(PhantomButton)`
  ${hideBrowserOutline}
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
  cursor: pointer;
  display: flex;
  align-items: center;
  &.disabled {
    cursor: disabled;
  }
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

export default DummySearchBar;
