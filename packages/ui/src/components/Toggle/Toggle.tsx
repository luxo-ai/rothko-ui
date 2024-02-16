import { classes } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';
import { hideChromeBrowserOutline } from '../../library/Styles';
import type { KindProps } from '../../theme/types';
import { keyDownFactory } from '../../utils/keyUtils';
import { Typography } from '../Typography';

type ToggleProps = KindProps & {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  offIcon?: JSX.Element;
  onChange: (toggled: boolean) => void;
  onIcon?: JSX.Element;
  style?: CSSProperties;
  toggled?: boolean;
  error?: boolean;
};

const Toggle = ({
  children,
  className,
  disabled,
  kind,
  offIcon,
  onChange,
  onIcon,
  style,
  toggled,
  error,
}: ToggleProps) => {
  const handleChange = () => {
    if (disabled) return;
    onChange(!toggled);
  };
  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });
  return (
    <ToggleContainerDiv className={className} style={style}>
      <OuterToggleDiv
        $toggled={toggled}
        aria-checked={!!toggled}
        aria-label="toggle"
        className={classes({ disabled, error })}
        kind={kind}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        role="switch"
        tabIndex={0}
      >
        <InnerToggleDiv className={classes(toggled && 'active')}>
          {toggled ? onIcon && <>{onIcon}</> : offIcon && <>{offIcon}</>}
        </InnerToggleDiv>
      </OuterToggleDiv>
      {children && <Typography.body>{children}</Typography.body>}
    </ToggleContainerDiv>
  );
};

const ToggleContainerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type OuterToogleDivProp = KindProps & {
  $toggled?: boolean;
};

const OuterToggleDiv = styled.div<OuterToogleDivProp>`
  flex: 0 0 auto;
  -webkit-tap-highlight-color: transparent;
  ${hideChromeBrowserOutline}

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;
  user-select: none;
  outline: none;

  width: 3rem;
  height: calc(1.4rem + 2px);

  border: 1px solid var(--rothko-toggle-border);
  border-radius: 50vmin;

  background-color: ${({ $toggled, kind }) => {
    const unselected = css`var(--rothko-toggle-background, #dee7f5)`;
    if (!kind) {
      return $toggled ? 'var(--rothko-toggle-background_selected, #000)' : unselected;
    }
    return $toggled ? `var(--rothko-${kind}-400, #000)` : unselected;
  }};

  -webkit-transition: background-color 0.5s ease;
  -moz-transition: background-color 0.5s ease;
  -ms-transition: background-color 0.5s ease;
  transition: background-color 0.5s ease;

  &:focus-visible {
    :after {
      content: '';
      display: block;
      position: absolute;
      inset: -0.13rem;
      border-radius: 50vmin;
      border: 0.125rem solid ${({ kind }) => `var(--rothko-${kind}-500, #000)`};
    }
  }

  &.error:not(:focus):not(.focus) {
    background-color: var(--rothko-danger-transparent-500);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const InnerToggleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.4rem;
  height: 1.4rem;
  margin: 0 1px;

  background-color: #ffffff;
  border-radius: 50%;

  -webkit-transition: transform 0.15s ease-out 0s;
  -moz-transition: transform 0.15s ease-out 0s;
  -ms-transition: transform 0.15s ease-out 0s;
  transition: transform 0.15s ease-out 0s;

  &.active {
    // outer toggle width - width of inner toggle - horizontal margin - offset
    transform: translateX(calc(3rem - 1.4rem - 1px - 2px));
  }
`;

export default Toggle;
