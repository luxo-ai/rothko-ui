import React from 'react';
import styles from './Modal.module.scss';
import { classes } from '@rothko-ui/system';

type ModalBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const ModalBody = ({ id, className, style, children }: ModalBodyProps) => {
  return (
    <div id={id} style={style} className={classes(styles['modal__body'], className)}>
      {children}
    </div>
  );
};

export default ModalBody;
