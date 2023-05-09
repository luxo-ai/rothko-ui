import React from 'react';
import type { KindProps, RothkoKind } from '../../Theme';
import styled from 'styled-components';
import clsx from 'clsx';
import Typography from '../Typography/Typography';
import isString from 'lodash/isString';

type RadioProps = {
  selected?: boolean;
  children?: React.ReactNode;
  className?: string;
  error?: boolean;
  id?: string;
  kind?: RothkoKind;
  onChange: (val: boolean) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const Radio = ({ children, disabled, selected, onChange }: RadioProps) => {
  const handleChange = () => onChange(!selected);
  const renderContent = isString(children) ? (
    <Typography.body>{children}</Typography.body>
  ) : (
    children
  );
  return (
    <RadioContainerDiv aria-disabled={disabled} $disabled={disabled} onClick={handleChange}>
      <RadioOutlineDiv>
        <RadioInnerDiv className={clsx({ selected })} />
      </RadioOutlineDiv>
      {renderContent && <div>{renderContent}</div>}
    </RadioContainerDiv>
  );
};

const RadioContainerDiv = styled.div<{ $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center; // for children
  justify-content: flex-start;
  gap: 0.3rem;
  & > * {
    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  }
`;

const RadioOutlineDiv = styled.div`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-basic-300);
  width: 1.25rem;
  height: 1.25rem;
  border-radius: calc(1.25rem / 2);
  padding: 0.125rem;
`;

const RadioInnerDiv = styled.div<KindProps>`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-basic-200);

  width: 100%;
  height: 100%;
  border-radius: 50%;

  -webkit-transition: background-color 0.1s ease;
  -moz-transition: background-color 0.1s ease;
  -ms-transition: background-color 0.1s ease;
  transition: background-color 0.1s ease;

  &.selected {
    background-color: ${({ kind = 'info' }) => `var(--rothko-${kind}-500)`};
  }
`;

export default Radio;
