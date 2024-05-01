import React from 'react';

import { classes } from '@rothko-ui/utils';

import Typography from '../../components/Typography/Typography';
import styles from './ItemText.module.scss';

type ItemTextProps = {
  children: React.ReactNode;
  isPlaceHolder?: boolean;
};

const ItemText = ({ isPlaceHolder, children }: ItemTextProps) => {
  return (
    <Typography.body
      as="span"
      className={classes(styles['item-text'], isPlaceHolder && styles['item-text-placeholder'])}
    >
      {children}
    </Typography.body>
  );
};

export default ItemText;
