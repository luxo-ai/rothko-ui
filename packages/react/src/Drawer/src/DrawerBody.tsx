import { classes } from '@rothko-ui/system';
import React from 'react';

type DrawerBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const DrawerBody = ({ id, className, style, children }: DrawerBodyProps) => {
  return (
    <div id={id} style={style} className={classes('mt-4', className)}>
      {children}
    </div>
  );
};

export default DrawerBody;
