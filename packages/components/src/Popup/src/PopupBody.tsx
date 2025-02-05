import React from 'react';
import styles from './Popup.module.scss';
import { classes } from '@rothko-ui/system';

type PopupBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const PopupBody = ({ id, className, style, children }: PopupBodyProps) => {
  return (
    <div id={id} style={style} className={classes(styles['popup__body'], className)}>
      {children}
    </div>
  );
};

export default PopupBody;
