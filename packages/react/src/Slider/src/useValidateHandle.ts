import React, { useMemo } from 'react';

import type { SliderHandleProps } from './Shared';

export const useValidateHandle = (children?: React.ReactElement<SliderHandleProps>) => {
  const childHandle = useMemo(() => {
    if (!children) {
      return null;
    }
    if (React.Children.count(children) !== 1) {
      throw new Error('Slider requires exactly one child');
    }
    if (!React.isValidElement(children)) {
      throw new Error('Slider requires child to be valid React element');
    }
    return children;
  }, [children]);

  return childHandle;
};
