import { MinusOutline, PlusOutline } from '@rothko-ui/icons';
import React from 'react';

import type { Icon } from './types';
import { isFunction } from '@rothko-ui/system';

const ICON_SIZE = '1rem';

type AccordionIconProps = {
  /**
   * Determines if the icon is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Overrides the default icon component.
   * @type {Icon}
   */
  iconOverride?: Icon;
  /**
   * Determines if the icon is open.
   * @type {boolean}
   * @default false
   */
  open?: boolean;
};

const AccordionIcon = ({ iconOverride: IconOverride, open, disabled }: AccordionIconProps) => {
  if (IconOverride) {
    return isFunction(IconOverride) ? (
      <IconOverride
        aria-hidden
        open={Boolean(open)}
        disabled={Boolean(disabled)}
        size={ICON_SIZE}
      />
    ) : (
      <>{IconOverride}</>
    );
  }

  return open ? (
    <MinusOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
  ) : (
    <PlusOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
  );
};

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
