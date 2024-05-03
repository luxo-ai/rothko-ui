import React from 'react';
import styles from './PhantomInput.module.scss';

const PhantomInput = (props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>) => {
  console.log('AYOOO', styles);
  return <input {...props} className={styles['phantom-input']} />;
};

export default PhantomInput;
