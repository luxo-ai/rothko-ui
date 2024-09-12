import React, { useEffect, useRef, useState } from 'react';

import { classes, scopedClasses } from '@rothko-ui/utils';

import InlineSpinnerLoader from '../../library/Spinner/InlineSpinner';
import type { Accessory } from '../../library/types';
import type { RothkoKind, RothkoSize } from '../../theme';
import type { ButtonAppearance, ButtonVariant } from './types';
import { vuar } from '../../library/utils/vuar';
import styles from './Button.module.scss';
import type { WithAria } from '../../types';
import { getElementFullHeight } from '../../library/utils/domUtils';

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
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The keydown event handler.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * The role of the button.
   * @default 'button'
   */
  role?: React.AriaRole;
  /**
   * The variant of the button.
   * @default 'default'
   */
  variant?: ButtonVariant;
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
          <div className={styles['button__accessory']}>
            <Right aria-hidden size={accessorySizeMap[size]} color={iconColor} />
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
