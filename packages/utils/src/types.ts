/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nil = undefined | null;
export type Nilable<T> = T | Nil;

export type KeyLike = string | number | symbol;

export type Obj = Record<KeyLike, unknown>;

export type WithKey<Base extends Obj, Key extends keyof any, DataType> = DataType extends Nil
  ? Base
  : Base & { [K in Key]: DataType };

export type WithData<Base extends Obj, DataType> = WithKey<Base, 'data', DataType>;

export type DeepPartial<T> = T extends Obj
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type NestedRecord<T = string> = { [k: KeyLike]: NestedRecord | T };

export type Dictionary<K extends KeyLike, T> = Partial<Record<K, T>>;

export type Map<K extends KeyLike, T> = Record<K, T | null>;

export type Falsy = false | 0 | '' | null | undefined;
