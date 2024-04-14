import type { Nilable } from '@rothko-ui/utils';
import React from 'react';
import styled from 'styled-components';
import { ItemText } from '../../../library/Common';
import { PhantomButton } from '../../../library/PhantomButton';
import { PhantomInput } from '../../../library/PhantomInput';
import SearchButton from './SearchButton';
import styles from './styles';

type DummySearchBarProps = {
  activeText?: Nilable<string>;
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
    {/* for accessibility purposes */}
    <PhantomInput type="text" tabIndex={-1} readOnly visibility="hidden" position="absolute" />
    <DummySearchTextButton disabled={disabled} type="button" onClick={onClick}>
      {(activeText || placeholder) && (
        <ItemText light placeHolder={!activeText}>
          {activeText || placeholder}
        </ItemText>
      )}
    </DummySearchTextButton>
    <SearchButton disabled={disabled || !activeText} onClick={() => onSubmit()} type="button" />
  </PlaceholderWrapperDiv>
);

const PlaceholderWrapperDiv = styled.div`
  ${styles.searchBarWrapperStyle}
`;

const DummySearchTextButton = styled(PhantomButton)`
  display: flex;
  ${styles.searchBarInputStyle}
`;

export default DummySearchBar;
