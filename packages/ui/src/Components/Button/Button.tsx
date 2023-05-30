import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import type { KindProps, RothkoKind, RothkoSize } from '../../Theme';
import InlineSpinnerLoader from '../../Library/Loader/InlineSpinnerLoader';
import type { Accessory } from '../../Library/types';
import type { ButtonAppearance, ButtonShape } from './types';

type HtmlButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  type?: 'button' | 'submit' | 'reset';
};

const sizeMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  `,
  s: css`
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
  `,
  m: css`
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  `,
  l: css`
    padding: 0.625rem 0.94rem;
    font-size: 1.25rem;
    border-width: 2px;
  `,
  xl: css`
    padding: 1rem 1.3rem;
    font-size: 1.75rem;
    border-width: 2px;
  `,
};

const accessorySizeMap: Record<RothkoSize, number> = {
  xs: 10,
  s: 17,
  m: 23,
  l: 30,
  xl: 35,
};

type ButtonProps = {
  /** the semantic kind of the button */
  kind?: RothkoKind;
  /** does the button appear filled or outlined */
  appearance?: ButtonAppearance;
  /** button size */
  size?: RothkoSize;
  /** render an accessory to the left of the button content */
  accessoryLeft?: Accessory;
  /** render an accessory to the right of the button content  */
  accessoryRight?: Accessory;
  /** the button shaped */
  shape?: ButtonShape;
  /** is content loading from this target */
  loading?: boolean;
  /** make the width fit the button content */
  fitContent?: boolean;
  children?: React.ReactNode;
} & HtmlButtonProps;

const Button: React.FC<ButtonProps> = ({
  accessoryLeft: Left,
  accessoryRight: Right,
  appearance = 'filled',
  children,
  className,
  disabled,
  fitContent,
  kind = 'primary',
  loading,
  onClick,
  shape,
  size = 'm',
  style,
  tabIndex,
  type = 'button',
}) => {
  const childrenContainerRef = useRef<HTMLSpanElement | null>(null);
  const [childrenHeight, setChildrenHeight] = useState<number | null>(null);

  const appearanceClasses = {
    ['btn-pill']: shape === 'pill',
    ['btn-square']: shape == 'square',
    ['fit-content']: fitContent,
  } as const;

  const iconColor =
    appearance === 'outline'
      ? (`var(--rothko-${kind}-500, #000)` as const)
      : (`var(--rothko-button-${kind}-color, #000)` as const);

  useEffect(() => {
    if (!childrenContainerRef.current) return;
    const { height } = childrenContainerRef.current.getBoundingClientRect();
    setChildrenHeight(height - 0); // figure out this value later was 4
  }, [setChildrenHeight, childrenContainerRef]);

  return (
    <StyledButton
      appearance={appearance}
      className={clsx(appearanceClasses, `btn-size-${size}`, className)}
      disabled={disabled}
      kind={kind}
      onClick={onClick}
      style={style}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      role="button"
    >
      {Left && <Left size={accessorySizeMap[size]} color={iconColor} />}
      {loading ? (
        <InlineSpinnerLoader
          style={childrenHeight ? { width: childrenHeight, height: childrenHeight } : undefined}
          color={iconColor}
          size="s"
        />
      ) : (
        <span ref={childrenContainerRef}>{children}</span>
      )}
      {Right && <Right size={accessorySizeMap[size]} color={iconColor} />}
    </StyledButton>
  );
};

type BaseButtonProps = Required<KindProps> & { appearance: ButtonAppearance };

export const buttonStyle = css<BaseButtonProps>`
  // use font smoothing to make text more readable
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;

  // prevent double tap zoom on mobile
  touch-action: manipulation;

  width: 100%;
  background: ${({ appearance, kind }) =>
    appearance === 'outline' ? 'transparent' : `var(--rothko-${kind}-500, #000)`};
  font-family: var(--rothko-typography-body-regular);
  color: ${({ appearance, kind }) =>
    appearance === 'outline'
      ? `var(--rothko-${kind}-500, #000)`
      : `var(--rothko-button-${kind}-color, #000)`};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  outline: none;
  border: ${({ appearance }) => (appearance == 'outline' ? '1px solid' : 'none')};
  border-color: ${({ kind }) => `var(--rothko-${kind}-500, #000)`};

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.btn-size-${key} {
        ${value}
      }
    `
  )}

  // border-radius: 0.125rem;
  border-radius: 0;

  &.btn-pill {
    border-radius: 50vmin;
  }

  &.btn-square {
    border-radius: 0;
  }

  &.fit-content {
    width: fit-content;
  }

  &.btn-circle {
    border-radius: 50%;
    width: fit-content;
    padding: 0.5rem;
  }
`;

const StyledButton = styled.button<BaseButtonProps>`
  ${buttonStyle}

  :not(:disabled) {
    /**
     * hover is annoying and has bad UX on touch based machines
     * The element is still marked as "hover" after pressing and until
     * onBlur is called. Keep the same look for now (deactivate :hover)
      :hover {
    }
    */
    :focus {
    }
    :active {
      background: ${({ appearance, kind }) =>
        appearance === 'outline' ? css`transparent` : `var(--rothko-${kind}-400, #000)`};
      border-color: ${({ kind }) => `var(--rothko-${kind}-400, #000)`};
    }
  }

  :disabled {
    background: ${({ appearance, kind }) =>
      appearance === 'outline' ? css`transparent` : `var(--rothko-${kind}-transparent-500, #000)`};
    border-color: ${({ appearance, kind }) =>
      appearance !== 'outline' ? css`transparent` : `var(--rothko-${kind}-transparent-500, #000)`};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

export default Button;
