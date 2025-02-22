import type { Nilable } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';

const nonDynamicClasses = [
  'ios-tap-highlight-color-transparent',
  // === text ===
  'text-(--rothko-input-foreground)',
  'rothko-font-regular',
  'rothko-paragraph-size-default',
  // ====
  'appearance-none',
  'border-none',
  'outline-none',
  // ===
  'bg-(--rothko-input-background)',
  'rounded-(--rothko-input-border-radius)',
  'py-[0.5rem]', // make token
  'px-[0.75rem]', // make token
].join(' ');

export const createInputBaseClasses = ({
  error,
  disabled,
}: {
  error?: boolean;
  disabled?: boolean;
}) => {
  return (...classNames: Nilable<string>[]) =>
    classes(
      nonDynamicClasses,
      disabled && 'cursor-not-allowed',
      disabled && 'opacity-60',
      error && 'outline-1',
      error && 'outline-solid',
      error && 'outline-(--rothko-danger)',
      ...classNames
    );
};
