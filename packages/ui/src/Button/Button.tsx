import clsx from 'clsx';
import React from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import { SimpleInlineSpinner } from '../Spinner';
import { BODY_FONT_FAMILY } from '../Typography';
import type { RothkoKind, RothkoSize } from '../Theme';
import { idkFn } from '../Theme/themeV2';

type ButtonAppearance = 'filled' | 'outline';

type HtmlButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'onClick' | 'type' | 'disabled' | 'tabIndex' | 'style'
>;

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

type Accessory = (props: { size: number; color: string }) => JSX.Element;

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
  /** is the button pill shaped */
  pill?: boolean;
  /** is the button circular shaped */
  circle?: boolean;
  /** is content loading from this target */
  loading?: boolean;
  /** make the width fit the button content */
  fitContent?: boolean;
  children?: React.ReactNode;
} & HtmlButtonProps;

export const Button: React.FC<ButtonProps> = ({
  accessoryLeft: Left,
  accessoryRight: Right,
  appearance = 'filled',
  children,
  circle,
  className,
  disabled,
  fitContent,
  kind = 'primary',
  loading,
  onClick,
  pill,
  size = 'm',
  style,
  tabIndex,
  type = 'button',
}) => {
  const appearanceClasses = {
    ['btn-circle']: circle,
    ['btn-pill']: pill,
    ['fit-content']: fitContent,
  } as const;

  const iconColor = appearance === 'outline' ? idkFn(kind) : idkFn(kind, 'text');

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
    >
      {Left && <Left size={accessorySizeMap[size]} color={iconColor} />}
      {loading ? (
        <SimpleInlineSpinner asText={appearance !== 'outline'} kind={kind} size="s" />
      ) : (
        <>{children}</>
      )}
      {Right && <Right size={accessorySizeMap[size]} color={iconColor} />}
    </StyledButton>
  );
};

type BaseButtonProps = { appearance: ButtonAppearance; kind: RothkoKind };

export const buttonStyle = css<BaseButtonProps>`
  -webkit-tap-highlight-color: transparent;

  width: 100%;
  background: ${({ appearance, kind }) => (appearance === 'outline' ? css`white` : idkFn(kind))};
  font-family: ${BODY_FONT_FAMILY.regular};
  color: ${({ appearance, kind }) =>
    appearance === 'outline' ? idkFn(kind) : idkFn(kind, 'text')};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  outline: none;
  border: ${({ appearance }) => (appearance == 'outline' ? '1px solid' : 'none')};
  border-color: ${({ kind }) => idkFn(kind)};

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.btn-size-${key} {
        ${value}
      }
    `
  )}

  &:not(.btn-pill) {
    border-radius: 0.125rem;
  }

  &.btn-pill {
    border-radius: 50vmin;
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
     */
    :hover {
    }
    :focus {
    }
    :active {
      background: ${({ appearance, kind }) =>
        appearance === 'outline' ? css`transparent` : idkFn(kind, 'bg-active')};

      border-color: ${({ kind }) => idkFn(kind, 'bg-active')};
      ${({ appearance, kind }) =>
        appearance === 'outline'
          ? css`
              color: ${idkFn(kind, 'bg-active')};
            `
          : ''};
    }
  }

  :disabled {
    background: ${({ appearance, kind }) =>
      appearance === 'outline' ? css`transparent` : idkFn(kind, 'bg-disabled')};
    border-color: ${({ appearance, kind }) =>
      appearance !== 'outline' ? css`transparent` : idkFn(kind, 'bg-disabled')};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;
