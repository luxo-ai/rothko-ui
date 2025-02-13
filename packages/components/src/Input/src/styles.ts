import { classes, Nilable } from '@rothko-ui/system';

export const inputBaseCls =
  ({ error, disabled }: { error?: boolean; disabled?: boolean }) =>
  (...classNames: Nilable<string>[]) =>
    classes(
      'ios-tap-highlight-color-transparent',
      // === text ===
      'color-input',
      'font-rothko-regular',
      'font-rothko-size-body',
      'leading-(--rothko-line-height-body)',
      // ====
      'appearance-none',
      'border-none',
      'outline-none',
      // ===
      'bg-input',
      'rounded-[0.125rem]', // make token
      'py-[0.5rem]', // make token
      'px-[0.75rem]', // make token
      disabled && 'cursor-not-allowed',
      disabled && 'opacity-60',
      error && 'outline-1',
      error && 'outline-solid',
      error && 'outline-(--rothko-danger)',
      ...classNames
    );
