import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './List.module.scss';

const scopedClasses = sc(styles);

type ListProps = React.CSSProperties & {
  children: React.ReactNode;
  className?: string;
  variant?: 'ordered' | 'unordered' | 'none';
};

const List = ({ children, className, variant = 'unordered', ...style }: ListProps) => {
  const baseClasses = scopedClasses('list', variant === 'none' && 'list--no-bullet');
  if (variant === 'ordered') {
    return (
      <ol className={classes(baseClasses, className)} style={style} role="list">
        {children}
      </ol>
    );
  }
  return (
    <ul className={classes(baseClasses, className)} style={style} role="list">
      {children}
    </ul>
  );
};

export default List;
