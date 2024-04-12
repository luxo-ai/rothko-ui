import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';

import { classes } from '@rothko-ui/utils';

import InlineSpinnerLoader from '../../library/Loaderz/InlineSpinnerLoader';
import type { Accessory } from '../../library/types';
import type { KindProps, RothkoKind, RothkoSize } from '../../theme';
import type { ButtonAppearance, ButtonShape } from './types';
import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaLabeling,
  WithAriaLive,
  WithAriaPressed,
} from '../../types';

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
    font-size: 1rem; // 0.875rem; // was 1rem
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
  m: 20,
  l: 30,
  xl: 35,
};

type WithAria<T> = WithAriaDisabled<
  WithAriaLive<
    WithAriaPressed<
      WithAriaHidden<
        WithAriaExpanded<WithAriaHasPopup<WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>>>
      >
    >
  >
>;

type ButtonProps = WithAria<{
  id?: string;
  /** Determines if the button is disabled. Default is false. */
  disabled?: boolean;
  /** Click event handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Keydown event handler. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** The content of the button. */
  children?: React.ReactNode;
  /** CSS class name for custom styling. */
  className?: string;
  /** Is content loading from this target. Default is false. */
  loading?: boolean;
  /** Make the width fit the button content. Default is false. */
  fitContent?: boolean;
  /** Inline styles for the button. */
  style?: React.CSSProperties;
  /** The semantic kind of the button. Default is 'primary'. */
  kind?: RothkoKind;
  /** Does the button appear filled or outlined. Default is 'filled'. */
  appearance?: ButtonAppearance;
  /** Button size. Default is 'm'. */
  size?: RothkoSize;
  /** Render an accessory to the left of the button content. */
  accessoryLeft?: Accessory;
  /** Render an accessory to the right of the button content. */
  accessoryRight?: Accessory;
  /** The button shape. */
  shape?: ButtonShape;
  /** Tab index of the button. */
  tabIndex?: number;
  /** Type of the button. Default is 'button'. */
  type?: 'button' | 'submit' | 'reset';
  /** Aria role of the button. */
  role?: React.AriaRole;
}>;

const Button: React.FC<ButtonProps> = ({
  id,
  accessoryLeft: Left,
  accessoryRight: Right,
  appearance = 'filled',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  'aria-disabled': ariaDisabled,
  children,
  className,
  disabled,
  fitContent,
  kind = 'primary',
  loading,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  shape,
  size = 'm',
  style,
  tabIndex,
  type = 'button',
  role = 'button',
}) => {
  const childrenContainerRef = useRef<HTMLDivElement | null>(null);
  const [childrenHeight, setChildrenHeight] = useState<number | null>(18); // was null before. How do we do this better?

  const appearanceClasses = {
    ['btn-pill']: shape === 'pill',
    ['btn-square']: shape == 'square',
    ['fit-content']: fitContent,
  } as const;

  const iconColor =
    appearance === 'outline'
      ? (`var(--rothko-${kind}-500, #000)` as const)
      : (`var(--rothko-${kind}-color, #000)` as const);

  const { onClick, onKeyDown } = useMemo(
    () => ({
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (loading || disabled) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          onClickProp?.(e);
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (loading || disabled) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          onKeyDownProp?.(e);
        }
      },
    }),
    [loading, disabled, onClickProp, onKeyDownProp]
  );

  useEffect(() => {
    if (!childrenContainerRef.current) return;
    const { height } = childrenContainerRef.current.getBoundingClientRect();
    setChildrenHeight(height - 0); // figure out this value later was 4
  }, [setChildrenHeight, childrenContainerRef, size]);

  return (
    <StyledButton
      id={id}
      appearance={appearance}
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled || disabled}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-haspopup={ariaHasPopup}
      aria-hidden={ariaHidden}
      aria-labelledby={ariaLabelledBy}
      aria-pressed={ariaPressed}
      aria-busy={loading}
      className={classes(appearanceClasses, `btn-size-${size}`, className)}
      disabled={disabled}
      kind={kind}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      style={style}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
    >
      <ContainerDiv ref={childrenContainerRef}>
        {!loading && Left && (
          <AccessoryContainerDiv $kind="left">
            <Left aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </AccessoryContainerDiv>
        )}
        {loading ? (
          <InlineSpinnerLoader
            aria-label="Loading"
            style={
              childrenHeight
                ? { width: childrenHeight, height: childrenHeight, margin: 'auto' }
                : { margin: 'auto' }
            }
            color={iconColor}
            size="s"
          />
        ) : (
          <span>{children}</span>
        )}
        {!loading && Right && (
          <AccessoryContainerDiv $kind="right">
            <Right aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </AccessoryContainerDiv>
        )}
      </ContainerDiv>
    </StyledButton>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccessoryContainerDiv = styled.div<{ $kind: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  ${({ $kind }) => {
    return $kind === 'left'
      ? css`
          margin-right: 0.25rem;
        `
      : css`
          margin-left: 0.25rem;
        `;
  }}
`;

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
      : `var(--rothko-${kind}-color, #000)`};

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
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export default Button;
