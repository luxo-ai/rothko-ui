import React from 'react';

import { MinusOutline, PlusOutline } from '@rothko-ui/icons';

import type { IconOverride } from './types';

const SIZE = '1rem';

type AccordionIconProps = {
  color: string;
  disabled: boolean;
  iconOverride?: IconOverride;
  open: boolean;
};

const AccordionIcon = React.memo(
  ({ color, iconOverride: IconOverride, open, disabled }: AccordionIconProps) => {
    if (IconOverride) {
      return typeof IconOverride === 'function' ? (
        <IconOverride open={open} disabled={disabled} color={color} size={SIZE} />
      ) : (
        <>{IconOverride}</>
      );
    }
    return open ? (
      <MinusOutline fill={color} width={SIZE} height={SIZE} />
    ) : (
      <PlusOutline fill={color} width={SIZE} height={SIZE} />
    );
  }
);

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
