/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | undefined | null;
export type Nil = undefined | null;

export type KeyLike = string | number | symbol;

type Obj = Record<KeyLike, unknown>;

type WithKey<Base extends Obj, DataType, Key extends keyof any> = DataType extends Nil
  ? Base
  : Base & { [K in Key]: DataType };

export type WithData<Base extends Obj, DataType> = WithKey<Base, DataType, 'data'>;

export type DeepPartial<T> = T extends Obj
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type NestedRecord<T = string> = { [k: KeyLike]: NestedRecord | T };
