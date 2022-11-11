import type { Option } from '../Library/types';

export type QueryMatchFn<V, T = undefined> = (query: string, opt: Option<V, T>) => boolean;
