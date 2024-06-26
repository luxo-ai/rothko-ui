import React from 'react';

import { classes } from '@rothko-ui/utils';

import Typography from '../../components/Typography/Typography';
import styles from './ItemText.module.scss';

type ItemTextProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  isPlaceHolder?: boolean;
};

const ItemText = ({ style, isPlaceHolder, children }: ItemTextProps) => {
  return (
    <Typography.body
      as="span"
      style={style}
      className={classes(styles['item-text'], isPlaceHolder && styles['place-holder'])}
    >
      {children}
    </Typography.body>
  );
};

export default ItemText;
