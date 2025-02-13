import { classes } from '@rothko-ui/system';
import { LinkUnderlineVariant } from './types';

export const baseClz = ({
  size = 'm',
  disabled,
  underlineVariant = 'always',
}: {
  disabled?: boolean;
  size?: 's' | 'm';
  underlineVariant?: LinkUnderlineVariant;
}) => {
  return (className?: string) => {
    return classes(
      // == text classes for children to inherit ==
      'font-rothko-regular',
      'text-(--rothko-typography-link-color)',
      'p-0',
      size === 's' && 'font-size-(--rothko-font-size-body-small)',
      size === 's' && 'leading-(--rothko-line-height-body-small)',
      size !== 's' && 'font-size-(--rothko-font-size-body)',
      size !== 's' && 'leading-(--rothko-line-height-body)',
      underlineVariant === 'none' &&
        'no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline',
      underlineVariant === 'always' &&
        'underline hover:underline focus:underline active:underline visited:underline',
      underlineVariant === 'hover' && !disabled && 'underline-hover',
      className
    );
  };
};
