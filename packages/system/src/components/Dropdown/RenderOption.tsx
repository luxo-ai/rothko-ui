import React from 'react';

import styles from './RenderOption.module.scss';
import type { Option } from '../../types';

const DefaultRenderOption = (props: { option: Pick<Option<unknown>, 'label'> }) => (
  <span className={styles['default-render-option']}>{props.option.label}</span>
);

export default DefaultRenderOption;
