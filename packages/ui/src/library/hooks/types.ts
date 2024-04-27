import type { NestedOption } from '../types';

export enum Direction {
  INCR = 1,
  DECR = -1,
}

export type StackValue<V, T> = {
  options: StackOption<V, T>[];
  parentOption: {
    label: string;
    optIdx: number;
  };
};

export type StackOption<V, T> = Omit<NestedOption<V, T>, 'options'> & {
  hasMore: boolean;
};
