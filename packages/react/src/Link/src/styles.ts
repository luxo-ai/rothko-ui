import { classes, type RothkoSize } from '@rothko-ui/system';

import type { LinkUnderlineVariant } from './types';

export const createLinkBaseClasses = ({
  size = 'm',
  disabled,
  underlineVariant = 'always',
}: {
  disabled?: boolean;
  size?: RothkoSize;
  underlineVariant?: LinkUnderlineVariant;
}) => {
  return (className?: string) =>
    classes(
      // == text classes for children to inherit ==
      'rothko-font-regular',
      'text-(--rothko-typography-link-color)',
      'p-0',
      size === 'xs' && 'rothko-paragraph-size-xs',
      size === 's' && 'rothko-paragraph-size-s',
      size === 'm' && 'rothko-paragraph-size-m',
      size === 'l' && 'rothko-paragraph-size-l',
      underlineVariant === 'none' &&
        'no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline',
      underlineVariant === 'always' &&
        'underline hover:underline focus:underline active:underline visited:underline',
      underlineVariant === 'hover' && !disabled && 'underline-hover',
      className
    );
};
