import { MinusOutline, PlusOutline } from '@rothko-ui/icons';
import React from 'react';
import type { IconOverride } from './types';

const SIZE = '1rem';

type AccordionIconProps = {
  color: string;
  iconOverride?: IconOverride;
  open?: boolean;
};

const AccordionIcon = React.memo(
  ({ color, iconOverride: IconOverride, open }: AccordionIconProps) => {
    if (IconOverride) {
      return typeof IconOverride === 'function' ? (
        <IconOverride open={open} color={color} size={SIZE} />
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
