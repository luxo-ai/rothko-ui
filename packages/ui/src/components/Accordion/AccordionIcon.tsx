import React from 'react';

import { MinusOutline, PlusOutline } from '@rothko-ui/icons';

import type { Icon } from './types';
import type { RothkoKind } from '../../theme';
import { isFunctionalComponent } from '../../library/utils';
import { vuar } from '../../library/utils/vuar';

const ICON_SIZE = '1rem';

type AccordionIconProps = {
  /**
   * Determines if the AccordionIcon is disabled.
   */
  disabled?: boolean;
  /**
   * Overrides the default icon component.
   */
  iconOverride?: Icon;
  /**
   * The kind of Rothko theme to apply to the AccordionIcon.
   */
  kind?: RothkoKind;
  /**
   * Determines if the AccordionIcon is open.
   */
  open?: boolean;
};

const AccordionIcon = React.memo(
  ({ kind, iconOverride: IconOverride, open, disabled }: AccordionIconProps) => {
    const color = vuar({ kind, category: 'background', element: 'icon' });

    if (IconOverride) {
      return isFunctionalComponent(IconOverride) ? (
        <IconOverride
          aria-hidden
          open={Boolean(open)}
          disabled={Boolean(disabled)}
          color={color}
          size={ICON_SIZE}
        />
      ) : (
        <>{IconOverride}</>
      );
    }
    return open ? (
      <MinusOutline aria-hidden fill={color} width={ICON_SIZE} height={ICON_SIZE} />
    ) : (
      <PlusOutline aria-hidden fill={color} width={ICON_SIZE} height={ICON_SIZE} />
    );
  }
);

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
