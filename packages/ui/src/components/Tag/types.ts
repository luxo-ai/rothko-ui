import type { WithAriaLabeling, WithAriaSelected } from '../../types';

export type WithAria<T> = WithAriaSelected<WithAriaLabeling<T>>;
