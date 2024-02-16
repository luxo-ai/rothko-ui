import type { HexColor, RGBColor, RothkoKind, RothkoSize } from '../../Theme';

export type SpinnerSize = Exclude<RothkoSize, 'xs' | 'xl'>;
export type LoaderColor = RothkoKind | HexColor | RGBColor | `var(--rothko-${string}, ${HexColor})`;
