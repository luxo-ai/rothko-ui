import React from 'react';
import Typography from '../../components/Typography/Typography';
import type { Option } from '../types';
import styles from './RenderOption.module.scss';

const DefaultRenderOption = (props: { option: Pick<Option<unknown>, 'label'> }) => (
  <Typography.bodySmall className={styles['default-render-option']}>
    {props.option.label}
  </Typography.bodySmall>
);

export default DefaultRenderOption;
