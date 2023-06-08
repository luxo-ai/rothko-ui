import { classes, isString } from '@rothko-ui/utils';
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
    <RadioContainerDiv style={style} className={className}>
      <RadioOutlineDiv
        onClick={() => {
          if (!disabled) onSelect();
        }}
        role="radio"
        aria-label="radio"
        aria-checked={!!selected}
        aria-disabled={!!disabled}
        className={classes({ disabled })}
      >
        <RadioInnerDiv kind={kind} className={classes({ selected, error, disabled })} />
      </RadioOutlineDiv>
      {renderContent && <div>{renderContent}</div>}
    </RadioContainerDiv>
  );
};

const RadioContainerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center; // for children
  justify-content: flex-start;
  gap: 0.3rem;
`;

const RadioOutlineDiv = styled.div<{ $disabled?: boolean }>`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-radio-border, #000);
  width: 1.25rem;
  height: 1.25rem;
  border-radius: calc(1.25rem / 2);
  padding: 0.1875rem;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
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
    opacity: 0.6;
  }
`;

export default Radio;
