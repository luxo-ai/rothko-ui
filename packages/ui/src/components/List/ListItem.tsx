import React from 'react';

import { classes } from '@rothko-ui/utils';

import Flex from '../../layout/Flex/Flex';
import FlexItem from '../../layout/Flex/FlexItem';
import Typography from '../Typography/Typography';
import styles from './List.module.scss';

type ListItemProps = React.CSSProperties & {
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
        className={classes(styles['list__item'], styles['list__item--no-bullet'], className)}
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
    <li style={style} className={classes(styles['list__item'], className)} role="listitem">
      {children}
    </li>
  );
};

export default ListItem;
