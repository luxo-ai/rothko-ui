import { classes } from '@rothko-ui/utils';
import React from 'react';
import styles from './List.module.scss';

type ListProps = React.CSSProperties & {
  children: React.ReactNode;
  className?: string;
  variant?: 'ordered' | 'unordered' | 'none';
};

const List = ({ children, className, variant = 'unordered', ...style }: ListProps) => {
  return React.createElement(
    variant === 'ordered' ? 'ol' : 'ul',
    {
      style,
      className: classes(
        styles['list'],
        variant === 'none' && styles['list-style-none'],
        className
      ),
      role: 'list',
    },
    children
  );
};

export default List;
