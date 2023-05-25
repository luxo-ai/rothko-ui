import clsx from 'clsx';
import isString from 'lodash/isString';
import React from 'react';
import styled from 'styled-components';
import type { KindProps, RothkoKind } from '../../Theme';
import Typography from '../Typography/Typography';

type RadioProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  kind?: RothkoKind;
  onSelect: () => void;
  selected?: boolean;
  style?: React.CSSProperties;
};

const Radio = ({
  children,
  className,
  disabled,
  error,
  kind,
  onSelect,
  selected,
  style,
}: RadioProps) => {
  const renderContent = isString(children) ? (
    <Typography.body>{children}</Typography.body>
  ) : (
    children
  );
  return (
    <RadioContainerDiv style={style} className={className} $disabled={disabled} onClick={onSelect}>
      <RadioOutlineDiv role="radio" aria-label="radio" aria-checked={!!selected}>
        <RadioInnerDiv kind={kind} className={clsx({ selected, error, disabled })} />
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
  background-color: var(--rothko-radio-border, #000);
  width: 1.25rem;
  height: 1.25rem;
  border-radius: calc(1.25rem / 2);
  padding: 0.1875rem;
`;

const RadioInnerDiv = styled.div<KindProps>`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-radio-background, #ccc);

  width: 100%;
  height: 100%;
  border-radius: 50%;

  -webkit-transition: background-color 0.1s ease;
  -moz-transition: background-color 0.1s ease;
  -ms-transition: background-color 0.1s ease;
  transition: background-color 0.1s ease;

  &.selected {
    background-color: ${({ kind }) =>
      kind
        ? `var(--rothko-${kind}-500, #281D75)`
        : `var(--rothko-radio-background_selected, #281D75)`};
  }

  &.error {
    background-color: var(--rothko-error-500, #e60000);
  }

  &.disabled {
    opacity: 0.75;
  }
`;

export default Radio;
