import React from 'react';

import { classes } from '../../utils/classes';

type ShadedBackdropProps = {
  /**
   * Whether to show the backdrop.
   */
  show?: boolean;
  /**
   * Whether to blur the backdrop.
   */
  blur?: boolean;
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

export const ShadedBackdrop = ({
  show,
  blur,
  children,
  className,
  onClick,
}: ShadedBackdropProps) => {
  const clz = classes(
    'select-none',
    'fixed',
    'flex',
    'opacity-0',
    'transition-opacity duration-[80ms] ease-in-out',
    show && 'opacity-100',
    show && 'bg-black/50',
    show && 'inset-0',
    show && 'z-[999999]',
    blur && show && 'backdrop-blur-[6px]', // make token
    className
  );

  return (
    <div aria-hidden className={clz} onClick={onClick}>
      {children}
    </div>
  );
};
