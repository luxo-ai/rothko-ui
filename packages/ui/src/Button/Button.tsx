import clsx from 'clsx';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { SimpleInlineSpinner } from '../Spinner';
import { BODY_FONT_FAMILY } from '../Text';
import { AemikoKind, AemikoSize, CanColor, Color, GreyScale, useKindTheme } from '../Theme';

type Appearance = 'filled' | 'outline';

type HtmlButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'onClick' | 'type' | 'disabled' | 'tabIndex' | 'style'
>;

const sizeMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
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

const accessorySizeMap: Record<AemikoSize, number> = {
  xs: 10,
  s: 17,
  m: 23,
  l: 30,
  xl: 35,
};

type Accessory = (props: { size: number; color: Color }) => JSX.Element;

type ButtonProps = {
  /** the semantic kind of the button */
  kind?: AemikoKind | GreyScale;
  /** does the button appear filled or outlined */
  appearance?: Appearance;
  /** button size */
  size?: AemikoSize;
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
  kind = 'primary',
  appearance = 'filled',
  size = 'm',
  type = 'button',
  accessoryLeft: Left,
  accessoryRight: Right,
  className,
  children,
  tabIndex,
  disabled,
  pill,
  fitContent,
  loading,
  onClick,
  style,
  circle,
}) => {
  const [themeColorer] = useKindTheme(kind);

  const appearanceClasses = {
    ['btn-pill']: pill,
    ['fit-content']: fitContent,
    ['btn-circle']: circle,
  } as const;

  return (
    <StyledButton
      className={clsx(appearanceClasses, `btn-size-${size}`, className)}
      appearance={appearance}
      type={type}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      themeColorer={themeColorer}
      onClick={onClick}
      style={style}
    >
      {Left && <Left size={accessorySizeMap[size]} color={themeColorer('text')} />}
      {loading ? (
        <SimpleInlineSpinner asText={appearance !== 'outline'} kind={kind} size="s" />
      ) : (
        <>{children}</>
      )}
      {Right && <Right size={accessorySizeMap[size]} color={themeColorer('text')} />}
    </StyledButton>
  );
};

type BaseButtonProps = CanColor & { appearance: Appearance };

export const buttonStyle = css<BaseButtonProps>`
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  background: ${({ appearance, themeColorer }) =>
    appearance === 'outline' ? css`white` : themeColorer()};
  font-family: ${BODY_FONT_FAMILY.regular};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  outline: none;
  border: ${({ appearance }) => (appearance == 'outline' ? '1px solid' : 'none')};
  border-color: ${({ themeColorer }) => themeColorer()};
  color: ${({ appearance, themeColorer }) =>
    appearance === 'outline' ? themeColorer() : themeColorer('text')};

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.btn-size-${key} {
        ${value}
      }
    `
  )}

  &:not(.btn-pill) {
    border-radius: 0.125rem; // 2px
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
      background: ${({ appearance, themeColorer }) =>
        appearance === 'outline' ? css`transparent` : themeColorer('bg:active')};
      border-color: ${({ themeColorer }) => themeColorer('bg:active')};
      ${({ appearance, themeColorer }) =>
        appearance === 'outline'
          ? css`
              color: ${themeColorer('bg:active')};
            `
          : ''};
    }
  }

  :disabled {
    background: ${({ appearance, themeColorer }) =>
      appearance === 'outline' ? css`transparent` : themeColorer('bg:disabled')};
    border-color: ${({ appearance, themeColorer }) =>
      appearance !== 'outline' ? css`transparent` : themeColorer('bg:disabled')};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;
