import { classes } from '@helpers';
import React from 'react';

import styles from './Button.module.scss';

type PhantomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const PhantomButton = ({ children, onClick, className }: PhantomButtonProps) => {
  return (
    <button type="button" className={classes(styles.phantomButton, className)} onClick={onClick}>
      {children}
    </button>
  );
};
