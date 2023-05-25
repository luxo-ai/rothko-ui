import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import styled from 'styled-components';
import { hideChromeBrowserOutline } from '../../Library/Styles';
import type { KindProps } from '../../Theme/types';
import { keyDownFactory } from '../../utils/keyUtils';

type ToggleProps = KindProps & {
  children?: React.ReactNode;
  className?: string;
  onChange: (toggled: boolean) => void;
  style?: CSSProperties;
  toggled?: boolean;
  onIcon?: JSX.Element;
  offIcon?: JSX.Element;
};

const Toggle = ({
  children,
  className,
  kind = 'primary',
  onChange,
  style,
  toggled,
  onIcon,
  offIcon,
}: ToggleProps) => {
  const handleChange = () => onChange(!toggled);
  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });
  return (
    <ToggleContainerDiv className={className} style={style}>
      <OuterToggleDiv
        role="switch"
        aria-checked={!!toggled}
        aria-label="toggle"
        kind={kind}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        tabIndex={0}
        toggled={toggled}
      >
        <InnerToggleDiv className={clsx(toggled && 'active')}>
          {toggled ? onIcon && <>{onIcon}</> : offIcon && <>{offIcon}</>}
        </InnerToggleDiv>
      </OuterToggleDiv>
      <div className="flex-1 ml3">{children}</div>
    </ToggleContainerDiv>
  );
};

const ToggleContainerDiv = styled.div`
  display: flex;
  align-items: center;
`;

type OuterToogleDivProp = Required<KindProps> & {
  toggled?: boolean;
};

const OuterToggleDiv = styled.div<OuterToogleDivProp>`
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
  height: calc(1.5rem + 2px);

  border: 1px solid var(--rothko-basic-300);
  border-radius: 50vmin;

  background-color: ${({ toggled, kind }) =>
    toggled ? `var(--rothko-${kind}-400, #000)` : 'rgba(143, 155, 179, 0.16)'};

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
`;

const InnerToggleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.5rem;
  height: 1.5rem;
  margin: 0 1px;

  background-color: #ffffff;
  border-radius: 50%;

  -webkit-transition: transform 0.15s ease-out 0s;
  -moz-transition: transform 0.15s ease-out 0s;
  -ms-transition: transform 0.15s ease-out 0s;
  transition: transform 0.15s ease-out 0s;

  &.active {
    // outer toggle width - width of inner toggle - horizontal margin - offset
    transform: translateX(calc(3rem - 1.5rem - 1px - 2px));
  }
`;

export default Toggle;
