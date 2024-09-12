import React from 'react';
import { scopedClasses } from '@rothko-ui/utils';
import Typography from '../../components/Typography/Typography';
import styles from './ItemText.module.scss';

const sc = scopedClasses(styles);

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
      className={sc('item-text', isPlaceHolder && 'placeholder')}
    >
      {children}
    </Typography.body>
  );
};

export default ItemText;
