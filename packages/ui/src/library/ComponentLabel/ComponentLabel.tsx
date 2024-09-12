import React from 'react';
import Typography from '../../components/Typography/Typography';
import styles from './ComponentLabel.module.scss';
import { classes } from '@rothko-ui/utils';

const ComponentLabel = ({
  id,
  children,
  style,
  className,
}: {
  id?: string;
  children: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <Typography.label
    style={style}
    id={id}
    light
    className={classes(styles['component-label'], className)}
  >
    {children}
  </Typography.label>
);

export default ComponentLabel;
