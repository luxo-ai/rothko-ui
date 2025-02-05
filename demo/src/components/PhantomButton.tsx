import React from 'react';
import styles from './PhantomButton.module.scss';

type PhantomButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

export const PhantomButton = ({
  style,
  type = 'button',
  children,
  onClick,
  className,
}: PhantomButtonProps) => {
  const baseClasses = styles['phantom-button'];
  const classNames = [baseClasses, className].filter(Boolean).join(' ');
  return (
    <button style={style} type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
