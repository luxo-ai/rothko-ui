import React from 'react';
import { classes, scopedClasses } from '../../utils/classes';
import styles from './Button.module.scss';

const sc = scopedClasses(styles);

type PhantomButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'children'> & {
  displayFlex?: boolean;
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
};

export const PhantomButton = ({
  displayFlex,
  type = 'button',
  children,
  className,
  ...props
}: PhantomButtonProps) => {
  const baseClasses = sc('phantom-button', displayFlex && 'flex');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...props} type={type} className={classes(baseClasses, className)}>
      {children}
    </button>
  );
};
