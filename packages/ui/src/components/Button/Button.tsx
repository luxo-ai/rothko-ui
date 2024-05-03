import React, { useEffect, useRef, useState } from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import InlineSpinnerLoader from '../../library/InlineSpinner';
import type { Accessory } from '../../library/types';
import type { RothkoKind, RothkoSize } from '../../theme';
import type { ButtonAppearance, ButtonShape, WithButtonAria } from './types';
import { vuar } from '../../library/utils/vuar';
import styles from './Button.module.scss';

const scopedClasses = sc(styles);

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

  const baseClasses = scopedClasses(
    'button',
    `button--${appearance}--${kind}`,
    `button--${size}`,
    shape && `button--${shape}`,
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
