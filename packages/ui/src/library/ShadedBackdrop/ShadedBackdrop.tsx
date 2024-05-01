import React from 'react';
import styles from './ShadedBackdrop.module.scss';
import { classes } from '@rothko-ui/utils';

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
  paddingH?: boolean;
  paddingV?: boolean;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ShadedBackdrop = ({
  show,
  blur,
  children,
  paddingH,
  paddingV,
  onClick,
}: ShadedBackdropProps) => {
  return (
    <div
      aria-hidden
      className={classes(
        styles['shaded-backdrop'],
        show && styles['show'],
        blur && styles['blur'],
        paddingH && styles['padding-h'],
        paddingV && styles['padding-v']
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ShadedBackdrop;
