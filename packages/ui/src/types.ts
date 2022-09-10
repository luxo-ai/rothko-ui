export type EmSize = `${number}em`;
export type RemSize = `${number}rem`;
export type PercentSize = `${number}%`;
export type ViewportSize = `${number}vw` | `${number}vh`;

export type Grouped<T> = Readonly<{ [idx: string]: T }>;
export type NonEmptyArray<T> = T[] & { 0: T };
