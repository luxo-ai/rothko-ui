/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | undefined | null;
export type Nil = undefined | null;

export type Obj = Record<string | number, unknown>;

export type JsonLike<T> = T | { [k: string]: T | JsonLike<T> | T[] | JsonLike<T>[] };
export type Json = JsonLike<string | number | boolean | null>;
export type RangeLike = { startDate?: Date | string; endDate?: Date | string };

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends Obj ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type NonEmptyArray<T> = T[] & { 0: T };

export type MustHave<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };
export type RequireJust<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
  [P in K]-?: T[P];
};

export type Await<T> = T extends Promise<infer U> ? U : T;
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type Subset<A, B extends A> = B;
export type RecordOmit<T extends keyof any, V, O extends keyof any> = { [S in Exclude<T, O>]: V };

export type Join<S1, S2> = S1 extends string ? (S2 extends string ? `${S1}.${S2}` : never) : never;
export type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type With<Base extends Obj, Extra> = Extra extends Nil ? Base : Base & Extra;
export type WithKey<Base extends Obj, DataType, Key extends keyof any> = DataType extends Nil
  ? Base
  : Base & { [K in Key]: DataType };
export type WithData<Base extends Obj, DataType> = WithKey<Base, DataType, 'data'>;
export type Replaced<T extends Obj, Key extends keyof T, NewType> = T & { [P in Key]: NewType };

export type DeepPartial<T> = T extends Obj
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type NestedRecord = { [k: string | number]: NestedRecord | string };
