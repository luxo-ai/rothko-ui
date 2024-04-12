import React from 'react';

import { MinusOutline, PlusOutline } from '@rothko-ui/icons';

import type { IconOverride } from './types';
import type { RothkoKind } from '../../theme';

const SIZE = '1rem';

type AccordionIconProps = {
  kind?: RothkoKind;
  disabled: boolean;
  iconOverride?: IconOverride;
  open: boolean;
};

function isFunctionalComponent<T>(v: React.ReactNode | React.FC<T>): v is React.FC<T> {
  return typeof v === 'function';
}

const AccordionIcon = React.memo(
  ({ kind, iconOverride: IconOverride, open, disabled }: AccordionIconProps) => {
    const color = kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-accordion-border, #000)';

    if (IconOverride) {
      return typeof IconOverride === 'function' ? (
        <IconOverride open={open} disabled={disabled} color={color} size={SIZE} />
      ) : (
        <>{IconOverride}</>
      );
    }
    return open ? (
      <MinusOutline aria-hidden fill={color} width={SIZE} height={SIZE} />
    ) : (
      <PlusOutline aria-hidden fill={color} width={SIZE} height={SIZE} />
    );
  }
);

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
