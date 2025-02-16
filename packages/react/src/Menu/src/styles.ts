import type { Nilable } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';

export const itemBase = (...className: Nilable<string | false>[]) => {
  return classes('outline-none', ...className);
};
