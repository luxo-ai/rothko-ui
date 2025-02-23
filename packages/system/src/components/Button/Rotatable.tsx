import React from 'react';

import { classes } from '../../utils';

type RotatableProps = {
  children: React.ReactNode;
  state: 'up' | 'down';
};

export const Rotatable = ({ children, state }: RotatableProps) => {
  const rotatableClasses = classes(
    'transition-transform duration-[125ms] ease-linear',
    state === 'down' && 'rotate-0',
    state === 'up' && 'rotate-180'
  );
  return <div className={rotatableClasses}>{children}</div>;
};
