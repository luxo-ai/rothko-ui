import React from 'react';
import { scopedClasses } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import styles from './ItemText.module.scss';

const sc = scopedClasses(styles);

type ItemTextProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  isPlaceHolder?: boolean;
};

const ItemText = ({ style, isPlaceHolder, children }: ItemTextProps) => {
  return (
    <Paragraph
      size="s"
      as="span"
      style={style}
      className={sc('item-text', isPlaceHolder && 'placeholder')}
    >
      {children}
    </Paragraph>
  );
};

export default ItemText;
