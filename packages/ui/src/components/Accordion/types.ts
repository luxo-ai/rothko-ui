import type { Accessory } from '../../library/types';
import type { WithAriaHidden, WithAriaLabeling } from '../../types';

export type Icon = React.ReactNode | Accessory<{ open: boolean; disabled: boolean }>;

export type WithAria<T> = WithAriaHidden<WithAriaLabeling<T>>;
