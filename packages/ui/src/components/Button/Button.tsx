import React, { useEffect, useRef, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';

import { classes } from '@rothko-ui/utils';

import InlineSpinnerLoader from '../../library/InlineSpinner';
import type { Accessory } from '../../library/types';
import type { RothkoKind, RothkoSize } from '../../theme';
import type { ButtonAppearance, ButtonShape, WithButtonAria } from './types';
import typographyStyles from '../Typography/styles';
import { vuar } from '../../library/utils/vuar';
import styles from './Button.module.scss';

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
};

const accessorySizeMap: Record<RothkoSize, number> = {
  xs: 10,
  s: 17,
  m: 20,
  l: 30,
};

type ButtonProps = WithButtonAria<{
  id?: string;
  /**
   * The left accessory component.
   */
  accessoryLeft?: Accessory;
  /**
   * The right accessory component.
   */
  accessoryRight?: Accessory;
  /**
   * The appearance style of the button.
   * @default 'filled'
   */
  appearance?: ButtonAppearance;
  /**
   * The content of the button.
   */
  children?: React.ReactNode;
  /**
   * The class name for styling purposes.
   */
  className?: string;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the button should fit its content.
   */
  fitContent?: boolean;
  /**
   * The kind of button.
   * @default 'primary'
   */
  kind?: RothkoKind;
  /**
   * Whether the button is in a loading state.
   */
  loading?: boolean;
  /**
   * The click event handler.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The keydown event handler.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * The role of the button.
   */
  role?: React.AriaRole;
  /**
   * The shape of the button.
   */
  shape?: ButtonShape;
  /**
   * The size of the button.
   * @default 'm'
   */
  size?: RothkoSize;
  /**
   * The inline style for the button.
   */
  style?: React.CSSProperties;
  /**
   * The tab index of the button.
   */
  tabIndex?: number;
  /**
   * The type of the button.
   */
  type?: 'button' | 'submit' | 'reset';
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
    [styles['btn-pill']]: shape === 'pill',
    [styles['btn-square']]: shape === 'square',
    [styles['fit-content']]: fitContent,
  } as const;

  const classNames = classes(
    styles[`btn-${appearance}-${kind}`],
    styles[`btn-size-${size}`],
    appearanceClasses,
    className
  );

  const iconColor = vuar({
    kind,
    category: appearance === 'outline' ? 'background' : 'foreground',
    fallback: '#000',
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading || disabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      onClickProp?.(e);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      onKeyDownProp?.(e);
    }
  };

  useEffect(() => {
    if (!childrenContainerRef.current) return;
    const { height } = childrenContainerRef.current.getBoundingClientRect();
    setChildrenHeight(height - 0); // figure out this value later was 4
  }, [setChildrenHeight, childrenContainerRef, size]);

  return (
    <button
      id={id}
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
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      style={style}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
    >
      <div className={styles['btn-content']} ref={childrenContainerRef}>
        {!loading && Left && (
          <div className={styles['btn-accessory']}>
            <Left aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </div>
        )}
        {loading ? (
          <InlineSpinnerLoader
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
          <div className={styles['btn-accessory']}>
            <Right aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </div>
        )}
      </div>
    </button>
  );
};

export const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AccessoryContainerDiv = styled.div<{ $kind: 'left' | 'right' }>`
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

type BaseButtonProps = {
  kind: RothkoKind;
  appearance: ButtonAppearance;
};

export const buttonStyle = css<BaseButtonProps>`
  // use font smoothing to make text more readable
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;

  // prevent double tap zoom on mobile
  touch-action: manipulation;

  width: 100%;
  background: ${({ appearance, kind }) =>
    appearance === 'outline' ? 'transparent' : vuar({ kind, category: 'background' })};

  ${typographyStyles.regularFontStyle}

  color: ${({ appearance, kind }) =>
    vuar({
      kind,
      category: appearance === 'outline' ? 'background' : 'foreground',
      fallback: '#000',
    })};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  outline: none;
  border: ${({ appearance }) => (appearance == 'outline' ? '1px solid' : 'none')};
  border-color: ${({ kind }) => vuar({ kind, category: 'border', fallback: '#000' })};

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

export const StyledButton = styled.button<BaseButtonProps>`
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
      ${({ appearance, kind }) =>
        appearance === 'outline'
          ? css`
              background: transparent;
            `
          : css`
              background: ${vuar({ kind, scale: 400, category: 'background' })};
            `}
      border-color: ${({ kind }) => vuar({ kind, scale: 400, category: 'background' })};
    }
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export default Button;
