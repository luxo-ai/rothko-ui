import React from 'react';

import styles from './List.module.scss';

type ListProps = React.CSSProperties & {
  children: React.ReactNode;
};

export const List = ({ children, ...style }: ListProps) => {
  return (
    <ul className={styles['list']} style={style} role="list">
      {children}
    </ul>
  );
};

type ListItemProps = React.CSSProperties & {
  children: React.ReactNode;
};

export const ListItem = ({ children, ...style }: ListItemProps) => {
  return (
    <li style={style} className={styles['list__item']} role="listitem">
      {children}
    </li>
  );
};
