/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nil = undefined | null;
export type Nilable<T> = T | Nil;

export type KeyLike = keyof any;
export type Obj = Record<KeyLike, unknown>;

export type DeepPartial<T> = T extends Obj
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type DeepRequired<T> = T extends Obj
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

export type NestedRecord<T = string> = { [k: KeyLike]: NestedRecord<T> | T };
export type Dictionary<K extends KeyLike, T> = Partial<Record<K, T>>;

export type Falsy = false | 0 | '' | null | undefined;
