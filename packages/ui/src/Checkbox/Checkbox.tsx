import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme';
import { ThemedElement } from '../Theme/types';
import { keyDownFactory } from '../utils/keyUtils';

export type CheckboxProps = {
  className?: string;
  style?: React.CSSProperties;
  error?: boolean;
  required?: boolean;
  checked?: boolean;
  onChange: (val: boolean) => void;
  children?: React.ReactNode;
  id?: string;
};

export const Checkbox = ({
  className,
  style,
  children,
  error,
  required,
  checked,
  onChange,
  id,
}: CheckboxProps) => {
  const { theme } = useTheme();
  const handleChange = () => onChange(!checked);
  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });
  return (
    <CheckboxContainerDiv style={style} className={className}>
      <StyledCheckboxDiv
        id={id}
        tabIndex={0}
        onClick={handleChange}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        role="checkbox"
        className={clsx({ error, checked })}
        aria-invalid={!!error}
        aria-required={!!required}
        aemikoTheme={theme}
      />
      <div>{children}</div>
    </CheckboxContainerDiv>
  );
};

const CheckboxContainerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25rem;
`;

const StyledCheckboxDiv = styled.div<ThemedElement>`
  background-color: ${({ aemikoTheme }) => aemikoTheme['basic-200']};
  cursor: pointer;

  width: 0.875rem;
  height: 0.875rem;

  border-radius: 0.25rem;
  padding: 0.25rem;

  &.checked {
    background-color: ${({ aemikoTheme }) => aemikoTheme['secondary-500']};
    background-image: url('data:image/svg+xml,%0A%20%20%20%20%3Csvg%20width%3D%2217%22%20height%3D%2213%22%20viewBox%3D%220%200%2017%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M6.50002%2012.6L0.400024%206.60002L2.60002%204.40002L6.50002%208.40002L13.9%200.900024L16.1%203.10002L6.50002%2012.6Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-origin: content-box;
  }

  &:focus-visible {
    outline: 1px solid ${({ aemikoTheme }) => aemikoTheme['info-300']};
  }

  &.error:not(:focus) {
    background-color: ${({ aemikoTheme }) => aemikoTheme['danger-transparent-500']};
  }
`;
