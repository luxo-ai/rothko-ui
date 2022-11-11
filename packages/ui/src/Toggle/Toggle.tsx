import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import styled from 'styled-components';
import type { CanColor } from '../Theme';
import { useKindTheme } from '../Theme';
import type { AemikoKind, ThemedElement } from '../Theme/types';
import { keyDownFactory } from '../utils/keyUtils';

export type ToggleProps = {
  toggled?: boolean;
  onChange: (toggled: boolean) => void;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  kind?: AemikoKind;
};

export function Toggle({
  toggled,
  onChange,
  children,
  style,
  className,
  kind = 'info',
}: ToggleProps) {
  const [colorer, theme] = useKindTheme(kind);
  const handleChange = () => onChange(!toggled);
  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });
  return (
    <div className={clsx('flex items-center', className)} style={style}>
      <Outer
        tabIndex={0}
        className={clsx(toggled && 'active')}
        onKeyDown={onKeyDown}
        onClick={handleChange}
        aemikoTheme={theme}
        themeColorer={colorer}
      >
        <Inner className={clsx(toggled && 'active')}></Inner>
      </Outer>
      <div className="flex-1 ml3">{children}</div>
    </div>
  );
}

const Outer = styled.div<ThemedElement & CanColor>`
  border-radius: 50vmin;
  width: 48px;
  height: 28px;
  border: 0.125rem solid ${({ aemikoTheme }) => aemikoTheme['basic-300']};
  background-color: rgba(143, 155, 179, 0.16);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  position: relative;
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
      border: 0.125rem solid ${({ themeColorer }) => themeColorer('border:active')};
    }
  }

  &.active {
    background-color: ${({ themeColorer }) => themeColorer('bg:active')};
  }
`;

const Inner = styled.div`
  background: #ffffff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  margin: 0px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.15s ease-out 0s;

  &.active {
    transform: translateX(20px);
  }

  &:not(.active) * {
    display: none;
  }
`;
