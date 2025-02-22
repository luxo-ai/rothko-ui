import React from 'react';

import { classes } from '../../utils/classes';

export type BackdropVariant = 'shaded' | 'none' | 'blur';

type BackdropProps = {
  /**
   * Whether to show the backdrop.
   */
  show?: boolean;
  /**
   * The variant of the backdrop.
   */
  variant?: BackdropVariant;
  /**
   * The children to render.
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   */
  className?: string;
  /**
   * Click event handler.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Backdrop = ({
  show,
  variant = 'shaded',
  children,
  className,
  onClick,
}: BackdropProps) => {
  const clz = classes(
    'select-none',
    'fixed',
    'flex',
    'opacity-0',
    'transition-opacity duration-[80ms] ease-in-out',
    show && 'opacity-100',
    show && (variant === 'shaded' || variant === 'blur') && 'bg-black/50',
    show && 'inset-0',
    show && 'z-[999999]',
    variant === 'blur' && show && 'backdrop-blur-[4px]', // make token
    className
  );

  return (
    <div aria-hidden className={clz} onClick={onClick}>
      {children}
    </div>
  );
};
