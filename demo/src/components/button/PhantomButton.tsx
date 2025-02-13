import React from 'react';
import styles from './Button.module.scss';
import { classes } from '@rothko-ui/components';

type PhantomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const PhantomButton = ({ children, onClick, className }: PhantomButtonProps) => {
  return (
    <button
      type="button"
      className={classes(styles['phantom-button'], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
