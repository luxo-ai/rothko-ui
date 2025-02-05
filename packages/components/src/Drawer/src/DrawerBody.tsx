import React from 'react';
import styles from './Drawer.module.scss';
import { classes } from '@rothko-ui/system';

type DrawerBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const DrawerBody = ({ id, className, style, children }: DrawerBodyProps) => {
  return (
    <div id={id} style={style} className={classes(styles['drawer__body'], className)}>
      {children}
    </div>
  );
};

export default DrawerBody;
