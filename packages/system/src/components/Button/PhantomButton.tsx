import React from 'react';
import { classes } from '../../utils/classes';

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
  disabled,
  ...props
}: PhantomButtonProps) => {
  const phantomButtonClasses = classes(
    'ios-tap-highlight-color-transparent',
    'touch-action-manipulation',
    'bg-transparent',
    'border-none',
    'outline-none',
    'p-0',
    !disabled && 'cursor-pointer',
    'appearance-none',
    disabled && 'cursor-not-allowed',
    disabled && 'pointer-events-none',
    disabled && 'opacity-60',
    displayFlex && 'flex',
    className
  );
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...props} type={type} className={phantomButtonClasses}>
      {children}
    </button>
  );
};
