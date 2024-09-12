import type { Option } from '../../library/types';

export type QueryMatchFn<V, T = undefined> = (query: string, opt: Option<V, T>) => boolean;

export type AriaAttributes =
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-errormessage'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-disabled';
