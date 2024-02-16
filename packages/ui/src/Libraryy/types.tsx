import type { RemSize } from '../types';
import type { EmSize } from '../types';

type WithData<Base, DataType> = DataType extends undefined ? Base : Base & { data: DataType };

export type Value = string | number;

export type Option<V, T = undefined> = Readonly<
  WithData<{ id: V; label: string; disabled?: boolean }, T>
>;
export type NestedOption<V> = Option<V> & { subcategories?: Option<V>[] };

export type RenderOption<V, T = undefined> = (props: { option: Option<V, T> }) => JSX.Element;

export type FocusHandler = (e: React.FocusEvent<HTMLElement>) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Accessory<Props = {}> = (
  props: {
    size: number | RemSize | EmSize;
    color: string;
  } & Props
) => JSX.Element;
