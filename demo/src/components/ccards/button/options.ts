import type { ButtonAppearance, ButtonShape, Option, RothkoKind, RothkoSize } from '@rothko-ui/ui';

export const sizeOptions: Option<RothkoSize>[] = [
  { id: 'xs', label: 'xs' },
  { id: 's', label: 's' },
  { id: 'm', label: 'm' },
  { id: 'l', label: 'l' },
  { id: 'xl', label: 'xl' },
];

export const kindOptions: Option<RothkoKind>[] = [
  { id: 'basic', label: 'basic' },
  { id: 'danger', label: 'danger' },
  { id: 'info', label: 'info' },
  { id: 'primary', label: 'primary' },
  { id: 'secondary', label: 'secondary' },
  { id: 'success', label: 'success' },
  { id: 'warning', label: 'warning' },
];

export const appearanceOptions: Option<ButtonAppearance>[] = [
  { id: 'filled', label: 'filled' },
  { id: 'outline', label: 'outline' },
];

export const shapeOptions: Option<ButtonShape>[] = [
  { id: 'pill', label: 'pill' },
  { id: 'square', label: 'square' },
];
