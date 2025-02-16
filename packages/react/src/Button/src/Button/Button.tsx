import {
  InlineSpinner,
  getElementFullHeight,
  getElementFullWidth,
  classes,
} from '@rothko-ui/system';
import type { Accessory, Dictionary, RothkoKind, RothkoSize, WithAria } from '@rothko-ui/system';
import React, { useEffect, useRef, useState } from 'react';

import type { ButtonRadius, ButtonVariant } from '../types';

const accessorySizeMap: Record<RothkoSize, number> = {
  xs: 10,
  s: 17,
  m: 20,
  l: 30,
};

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-hidden'
  | 'aria-controls'
  | 'aria-haspopup'
  | 'aria-expanded'
  | 'aria-pressed'
  | 'aria-disabled';

type ButtonProps = {
  /**
   * The `id` attribute of the button.
   * @type {string}
   */
  id?: string;
  /**
   * The left accessory component.
   * @type {Accessory}
   */
  accessoryLeft?: Accessory;
  /**
   * The right accessory component.
   * @type {Accessory}
   */
  accessoryRight?: Accessory;
  /**
   * The content of the button.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Whether the button is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Display the button as an icon.
   * @type {boolean}
   * @default false
   */
  asIcon?: boolean;
  /**
   * The button's semantic style.
   * @type {RothkoKind}
   * @default 'primary'
   */
  kind?: RothkoKind;
  /**
   * Whether the button is in a loading state.
   * @type {boolean}
   * @default false
   */
  loading?: boolean;
  /**
   * The click event handler.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The keydown event handler.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * The role of the button.
   * @type {React.AriaRole}
   * @default 'button'
   */
  role?: React.AriaRole;
  /**
   * The variant of the button.
   * @type {ButtonVariant}
   * @default 'filled'
   */
  variant?: ButtonVariant;
  /**
   * The radius of the button.
   * @type {ButtonRadius}
   * @default 'default'
   */
  radius?: ButtonRadius;
  /**
   * The size of the button.
   * @type {RothkoSize}
   * @default 'm'
   */
  size?: RothkoSize;
  /**
   * The inline style for the button.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * The tab index of the button.
   * @type {number}
   */
  tabIndex?: number;
  /**
   * The type of the button.
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
};

export const paddingSizeMap: Record<string, string> = {
  xs: 'px-[0.5rem] py-[0.3rem]',
  s: 'px-[0.5rem] py-[0.3rem]',
  m: 'px-[0.75rem] py-[0.5rem]',
  l: 'px-[0.94rem] py-[0.625rem]',
};

export const fontSizeMap: Record<string, string> = {
  xs: 'text-xs', // Tailwind has `text-xs` = 0.75rem
  s: 'text-[0.85rem]', // No exact match in Tailwind, use arbitrary value
  m: 'text-base', // `text-base` = 1rem in Tailwind
  l: 'text-xl', // `text-xl` ≈ 1.25rem
};

export const borderWidthSizeMap: Dictionary<RothkoSize, string> = {
  l: 'border-[2px]',
};

const Button = ({
  id,
  accessoryLeft: Left,
  accessoryRight: Right,
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
  asIcon,
  kind = 'primary',
  loading,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  radius = 'default',
  variant = 'filled',
  size = 'm',
  style = {},
  tabIndex,
  type = 'button',
  role = 'button',
}: WithAria<ButtonProps, AriaAttributes>) => {
  const childrenContainerRef = useRef<HTMLDivElement | null>(null);
  const [childrenDim, setChildrenDim] = useState<{ width: number; height: number }>();
  const [childrenHeight, setChildrenHeight] = useState<number | null>(18); // was null before. How do we do this better?

  const baseClasses = classes(
    // ==== base button style ====
    'ios-tap-highlight-color-transparent',
    'font-smoothing-antialiased',
    'rothko-font-regular',
    'user-select-none',
    'appearance-none',
    // Prevent double tap zoom on mobile
    'touch-action-manipulation',
    'inline-flex',
    'items-center',
    'justify-center',
    !disabled && !loading && 'cursor-pointer',
    radius === 'default' && 'rounded-(--rothko-button-border-radius)', // 0.125rem
    radius === 'full' && 'rounded-[50vmin]',
    // ==== disabled ====
    disabled && 'pointer-events-none',
    disabled && 'cursor-not-allowed',
    disabled && 'opacity-65',
    // ==== kind ====
    variant === 'outline' && 'text-(--button-kind-bg)',
    variant === 'filled' && 'text-(--button-kind-fg)',
    variant === 'filled' && 'bg-(--button-kind-bg)',
    borderWidthSizeMap[size] || 'border',
    'border-solid',
    'border-(--button-kind-bg)',
    // ==== size ====
    !asIcon && paddingSizeMap[size],
    asIcon && 'p-1',
    !asIcon && 'min-w-20', // 5rem
    asIcon && 'w-[fit-content]',
    fontSizeMap[size],
    'transition-colors duration-400 ease-out',
    'not-disabled:active:border-(--button-kind-bg-active)',
    variant === 'outline' && 'not-disabled:active:text-(--button-kind-bg-active)',
    variant !== 'outline' && 'not-disabled:active:bg-(--button-kind-bg-active)'
  );

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

  const hasLeftAccessory = !!Left;
  const hasRightAccessory = !!Right;

  useEffect(() => {
    if (!childrenContainerRef.current || loading) return;
    const width = getElementFullWidth(childrenContainerRef.current);
    const height = getElementFullHeight(childrenContainerRef.current);
    setChildrenDim({ width, height });
    setChildrenHeight(height);
  }, [setChildrenHeight, childrenContainerRef, hasLeftAccessory, hasRightAccessory, size, loading]);

  const rothkoButtonKindVarStyle = {
    '--button-kind-bg': `var(--rothko-${kind})`,
    '--button-kind-bg-active': `var(--rothko-${kind}-400)`,
    '--button-kind-fg': `var(--rothko-${kind}-foreground)`,
  } as React.CSSProperties;

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
      className={classes(baseClasses, className)}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      style={{ ...style, ...rothkoButtonKindVarStyle }}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
    >
      <div
        className="flex items-center justify-center gap-1"
        style={
          loading
            ? { width: childrenDim?.width || undefined, height: childrenDim?.height || undefined }
            : undefined
        }
        ref={childrenContainerRef}
      >
        {!loading && Left && (
          <AccessoryContainer>
            <Left size={accessorySizeMap[size]} />
          </AccessoryContainer>
        )}
        {loading ? (
          <InlineSpinner
            style={{
              height: childrenHeight ? childrenHeight - 4 : 16,
              width: childrenHeight ? childrenHeight - 4 : 16,
              margin: 'auto',
            }}
            color="inherit"
            size="s"
          />
        ) : (
          <span>{children}</span>
        )}
        {!loading && Right && (
          <AccessoryContainer>
            <Right size={accessorySizeMap[size]} />
          </AccessoryContainer>
        )}
      </div>
    </button>
  );
};

const AccessoryContainer = ({ children }: { children: React.ReactNode }) => {
  // add flex + align-center since SVG elements that are children of a flex container (button)
  // can sometimes behave unexpectedly due to how their default sizing works.
  return (
    <div aria-hidden className="flex items-center">
      {children}
    </div>
  );
};

export default Button;
