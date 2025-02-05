import React from 'react';
import type { Option } from '../../types';
import styles from './RenderOption.module.scss';

const DefaultRenderOption = (props: { option: Pick<Option<unknown>, 'label'> }) => (
  <span className={styles['default-render-option']}>{props.option.label}</span>
);

export default DefaultRenderOption;
