import React from 'react';
import { classes } from '@rothko-ui/system';

type ItemTextProps = {
  children: React.ReactNode;
  className?: string;
};

const ItemText = ({ className, children }: ItemTextProps) => {
  return <span className={classes('user-select-none', className)}>{children}</span>;
};

export default ItemText;
