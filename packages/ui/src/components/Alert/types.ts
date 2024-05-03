import type { WithAriaHidden, WithAriaLabeling, WithAriaLive } from '../../types';

// Alert aria attributes
export type WithAria<T> = WithAriaHidden<WithAriaLabeling<WithAriaLive<T>>>;
