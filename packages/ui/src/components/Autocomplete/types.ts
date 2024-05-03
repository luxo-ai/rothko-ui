import type { Option } from '../../library/types';
import type {
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';

export type QueryMatchFn<V, T = undefined> = (query: string, opt: Option<V, T>) => boolean;

// Autocomplete aria attributes
export type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<WithAriaInvalid<WithAriaDisabled<WithAriaLabeling<T>>>>
>;
