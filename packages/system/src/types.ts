import type React from 'react';

// ====== Theme Types ======
// semantic names + primary + secondary
export type RothkoKind = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary';
export type RothkoSize = 'xs' | 's' | 'm' | 'l';

// ====== Color Types ======
// #hex | rgba() | rgb() | hsl() | hsla()
export type Color =
  | `#${string}`
  | `rgba(${string})`
  | `rgb(${string})`
  | `hsl(${string})`
  | `hsla(${string})`;

// ====== Size Types ======
// px | em | rem | % | vw | vh
export type Size =
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}vw`
  | `${number}vh`;

// ====== Option Types ======
type WithData<Base, DataType> = DataType extends undefined ? Base : Base & { data: DataType };

export type Value = string | number;

export type Option<V, T = undefined> = Readonly<
  WithData<{ id: V; label: string; disabled?: boolean }, T>
>;

export type NestedOption<V, T = undefined> = Option<V, T> & { options?: NestedOption<V, T>[] };

export type RenderOption<V, T = undefined> = (props: { option: Option<V, T> }) => JSX.Element;

export type RenderNestedOption<V, T = undefined> = (props: {
  option: Omit<NestedOption<V, T>, 'options'> & { hasMore: boolean };
}) => JSX.Element;

// ====== Other Types ======

export type FocusHandler = (e: React.FocusEvent<HTMLElement>) => void;

export type Accessory<Props = {}> = (
  props: Props & {
    size: number | Size;
  }
) => JSX.Element;

export type WithAria<O, T extends keyof React.AriaAttributes> = O & Pick<React.AriaAttributes, T>;
