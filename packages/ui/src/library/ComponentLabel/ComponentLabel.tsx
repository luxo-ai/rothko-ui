import React from 'react';
import Typography from '../../components/Typography/Typography';
import styles from './ComponentLabel.module.scss';

const ComponentLabel = ({ id, children }: { id?: string; children: string }) => (
  <Typography.label id={id} light className={styles['component-label']}>
    {children}
  </Typography.label>
);

export default ComponentLabel;
