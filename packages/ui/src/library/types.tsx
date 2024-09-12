import type { EmSize, RemSize } from '../types';

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

export type FocusHandler = (e: React.FocusEvent<HTMLElement>) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Accessory<Props = {}> = (
  props: Props & {
    size: number | RemSize | EmSize;
    color: string;
  }
) => JSX.Element;
