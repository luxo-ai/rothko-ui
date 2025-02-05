import React, { useEffect, useRef, useState } from 'react';
import {
  InlineSpinner,
  vuar,
  getElementFullHeight,
  classes,
  scopedClasses,
} from '@rothko-ui/system';
import type { Accessory, RothkoKind, RothkoSize, WithAria } from '@rothko-ui/system';
import type { ButtonAppearance, ButtonVariant } from '../types';
import styles from './Button.module.scss';

const sc = scopedClasses(styles);

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
   * The appearance style of the button.
   * @type {ButtonAppearance}
   * @default 'filled'
   */
  appearance?: ButtonAppearance;
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
   * Whether the button should fit its content.
   * @type {boolean}
   * @default false
   */
  fitContent?: boolean;
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
   * @default 'default'
   */
  variant?: ButtonVariant;
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

const Button = ({
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
  variant = 'default',
  size = 'm',
  style,
  tabIndex,
  type = 'button',
  role = 'button',
}: WithAria<ButtonProps, AriaAttributes>) => {
  const childrenContainerRef = useRef<HTMLDivElement | null>(null);
  const [childrenHeight, setChildrenHeight] = useState<number | null>(18); // was null before. How do we do this better?

  const baseClasses = sc(
    'button',
    `button--${appearance}--${kind}`,
    `button--${size}`,
    variant !== 'default' && `button--${variant}`,
    fitContent && 'button--fit-content'
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
    const height = getElementFullHeight(childrenContainerRef.current);
    setChildrenHeight(height);
  }, [setChildrenHeight, childrenContainerRef]);

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
      style={style}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
    >
      <div className={styles['button__content']} ref={childrenContainerRef}>
        {!loading && Left && (
          <div className={styles['button__accessory']}>
            <Left aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </div>
        )}
        {loading ? (
          <InlineSpinner
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
          <div className={styles['button__accessory']}>
            <Right aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
