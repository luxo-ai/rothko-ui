import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';

export type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;
