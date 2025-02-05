import type { Option } from '@rothko-ui/system';

export type QueryMatchFn<V, T = undefined> = (query: string, opt: Option<V, T>) => boolean;
