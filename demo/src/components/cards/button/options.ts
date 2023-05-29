import type { ButtonAppearance, ButtonShape, Option } from '@rothko-ui/ui';

export const appearanceOptions: Option<ButtonAppearance>[] = [
  { id: 'filled', label: 'filled' },
  { id: 'outline', label: 'outline' },
];

export const shapeOptions: Option<ButtonShape>[] = [
  { id: 'pill', label: 'pill' },
  { id: 'square', label: 'square' },
];
