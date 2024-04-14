import type { SpacingConfig, SpacingUnit } from './types';

const ROOT_FONT_SIZE = 16;
const baseScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;
const extendedScale = [20, 24, 28, 32, 36, 40] as const;
const spacingUnits = [...baseScale, ...extendedScale] as const;

export const generateSpacingScale = (spacingUnit: number) => {
  const scaleLabels: Partial<Record<SpacingUnit, number>> = {
    xs: 2,
    s: 3,
    m: 4,
    l: 6,
    xl: 9,
    '2xl': 12,
    '3xl': 20,
    '4xl': 30,
  };

  const scale = { 0: '0px' } as SpacingConfig;

  Object.entries(scaleLabels).forEach(([label, multiplier]) => {
    scale[label as SpacingUnit] = `${(spacingUnit * multiplier) / ROOT_FONT_SIZE}rem`;
  });

  spacingUnits.forEach(i => {
    scale[i] = `${(spacingUnit * i) / ROOT_FONT_SIZE}rem`;
  });

  return scale;
};
