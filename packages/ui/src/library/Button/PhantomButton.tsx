import React from 'react';
import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './Button.module.scss';

const scoppedClasses = sc(styles);

type PhantomButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  displayFlex?: boolean;
};

const PhantomButton = ({ displayFlex, children, className, ...props }: PhantomButtonProps) => {
  const baseClasses = scoppedClasses('phantom-button', displayFlex && 'flex');
  return (
    <button {...props} type="button" className={classes(baseClasses, className)}>
      {children}
    </button>
  );
};

export default PhantomButton;
