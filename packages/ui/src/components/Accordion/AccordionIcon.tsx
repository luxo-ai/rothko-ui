import { MinusOutline, PlusOutline } from '@rothko-ui/icons';
import React from 'react';
import type { IconOverride } from './types';

const SIZE = '1rem';

type AccordionIconProps = {
  color: string;
  iconOverride?: IconOverride;
  isOpen?: boolean;
};

const AccordionIcon = React.memo(
  ({ color, iconOverride: IconOverride, isOpen }: AccordionIconProps) => {
    if (IconOverride) {
      return typeof IconOverride === 'function' ? (
        <IconOverride open={isOpen} color={color} size={SIZE} />
      ) : (
        <>{IconOverride}</>
      );
    }
    return isOpen ? (
      <MinusOutline fill={color} width={SIZE} height={SIZE} />
    ) : (
      <PlusOutline fill={color} width={SIZE} height={SIZE} />
    );
  }
);

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
