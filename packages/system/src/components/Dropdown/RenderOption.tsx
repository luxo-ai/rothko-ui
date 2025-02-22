import React from 'react';

import type { Option } from '../../types';
import { classes } from '../../utils';

type DefaultRenderOptionProps = {
  option: Pick<Option<unknown>, 'label'>;
  className?: string;
};

const DefaultRenderOption = ({ option, className }: DefaultRenderOptionProps) => {
  const clz = classes(
    'm-0',
    'select-none',
    'rothko-color-body',
    'rothko-font-regular',
    'rothko-paragraph-size-s',
    'sm:rothko-paragraph-size-m',
    className
  );

  return <span className={clz}>{option.label}</span>;
};

export default DefaultRenderOption;
