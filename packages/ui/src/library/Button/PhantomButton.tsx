import React from 'react';
import { classes, scopedClasses } from '@rothko-ui/utils';
import styles from './Button.module.scss';

const sc = scopedClasses(styles);

type PhantomButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  displayFlex?: boolean;
  type?: 'submit' | 'reset' | 'button';
};

const PhantomButton = ({
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

export default PhantomButton;
