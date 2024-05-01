import React from 'react';
import type { CSSProperties } from 'styled-components';
import Flex from '../../layout/Flex/Flex';
import FlexItem from '../../layout/Flex/FlexItem';
import Typography from '../Typography/Typography';
import { classes } from '@rothko-ui/utils';
import styles from './ListItem.module.scss';

type ListItemProps = CSSProperties & {
  bullet?: JSX.Element;
  children: React.ReactNode;
  className?: string;
};

const ListItem = ({ bullet, children: childrenProp, className, ...style }: ListItemProps) => {
  const children =
    typeof childrenProp === 'string' ? (
      <Typography.body>{childrenProp}</Typography.body>
    ) : (
      <>{childrenProp}</>
    );

  if (bullet) {
    return (
      <li
        style={style}
        role="listitem"
        className={classes(styles['list-item'], styles['hide-bullet'], className)}
      >
        <Flex alignItems="center" gap="0.25rem">
          <FlexItem display="flex" flex="0 0 auto">
            {bullet}
          </FlexItem>
          <FlexItem flex="0 0 auto">{children}</FlexItem>
        </Flex>
      </li>
    );
  }

  return (
    <li style={style} className={classes(styles['list-item'], className)} role="listitem">
      {children}
    </li>
  );
};

export default ListItem;
