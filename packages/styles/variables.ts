type RothkoKind = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';

type RothkoKindScale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type RothkoScaledKind = `${RothkoKind}-${RothkoKindScale}`;

const rothkoDefaultKinds: Record<RothkoKind, string> = {
  primary: 'var(--rothko-primary)',
  secondary: 'var(--rothko-secondary)',
  info: 'var(--rothko-info)',
  success: 'var(--rothko-success)',
  warning: 'var(--rothko-warning)',
  danger: 'var(--rothko-danger)',
};

const rothkoScaledKinds: Record<RothkoScaledKind, string> = {
  'primary-100': 'var(--rothko-primary-100)',
  'primary-200': 'var(--rothko-primary-200)',
  'primary-300': 'var(--rothko-primary-300)',
  'primary-400': 'var(--rothko-primary-400)',
  'primary-500': 'var(--rothko-primary-500)',
  'primary-600': 'var(--rothko-primary-600)',
  'primary-700': 'var(--rothko-primary-700)',
  'primary-800': 'var(--rothko-primary-800)',
  'primary-900': 'var(--rothko-primary-900)',
  'secondary-100': 'var(--rothko-secondary-100)',
  'secondary-200': 'var(--rothko-secondary-200)',
  'secondary-300': 'var(--rothko-secondary-300)',
  'secondary-400': 'var(--rothko-secondary-400)',
  'secondary-500': 'var(--rothko-secondary-500)',
  'secondary-600': 'var(--rothko-secondary-600)',
  'secondary-700': 'var(--rothko-secondary-700)',
  'secondary-800': 'var(--rothko-secondary-800)',
  'secondary-900': 'var(--rothko-secondary-900)',
  'info-100': 'var(--rothko-info-100)',
  'info-200': 'var(--rothko-info-200)',
  'info-300': 'var(--rothko-info-300)',
  'info-400': 'var(--rothko-info-400)',
  'info-500': 'var(--rothko-info-500)',
  'info-600': 'var(--rothko-info-600)',
  'info-700': 'var(--rothko-info-700)',
  'info-800': 'var(--rothko-info-800)',
  'info-900': 'var(--rothko-info-900)',
  'success-100': 'var(--rothko-success-100)',
  'success-200': 'var(--rothko-success-200)',
  'success-300': 'var(--rothko-success-300)',
  'success-400': 'var(--rothko-success-400)',
  'success-500': 'var(--rothko-success-500)',
  'success-600': 'var(--rothko-success-600)',
  'success-700': 'var(--rothko-success-700)',
  'success-800': 'var(--rothko-success-800)',
  'success-900': 'var(--rothko-success-900)',
  'warning-100': 'var(--rothko-warning-100)',
  'warning-200': 'var(--rothko-warning-200)',
  'warning-300': 'var(--rothko-warning-300)',
  'warning-400': 'var(--rothko-warning-400)',
  'warning-500': 'var(--rothko-warning-500)',
  'warning-600': 'var(--rothko-warning-600)',
  'warning-700': 'var(--rothko-warning-700)',
  'warning-800': 'var(--rothko-warning-800)',
  'warning-900': 'var(--rothko-warning-900)',
  'danger-100': 'var(--rothko-danger-100)',
  'danger-200': 'var(--rothko-danger-200)',
  'danger-300': 'var(--rothko-danger-300)',
  'danger-400': 'var(--rothko-danger-400)',
  'danger-500': 'var(--rothko-danger-500)',
  'danger-600': 'var(--rothko-danger-600)',
  'danger-700': 'var(--rothko-danger-700)',
  'danger-800': 'var(--rothko-danger-800)',
  'danger-900': 'var(--rothko-danger-900)',
};

const rothkoKindForegrounds: Record<RothkoKind, string> = {
  primary: 'var(--rothko-primary-foreground)',
  secondary: 'var(--rothko-secondary-foreground)',
  info: 'var(--rothko-info-foreground)',
  success: 'var(--rothko-success-foreground)',
  warning: 'var(--rothko-warning-foreground)',
  danger: 'var(--rothko-danger-foreground)',
};

export const rothkoSizes = ['xs', 's', 'm', 'l'] as const;

export const rothkoBackground = 'var(--rothko-background, #fff)';
export const rothkoForeground = 'var(--rothko-foreground, #000)';
export const rothkoBorder = 'var(--rothko-border, #000)';

export const bodyColor = 'var(--rothko-typography-body-color, #000)';
export const regularFont = 'var(--rothko-font-family-regular)';
export const boldFont = 'var(--rothko-font-family-bold, var(--rothko-font-family-regular))';
export const lightFont = 'var(--rothko-font-family-light, var(--rothko-font-family-regular))';
export const italicFont = 'var(--rothko-font-family-italic, var(--rothko-font-family-regular))';

export const bodyLargeFontSize = 'var(--rothko-font-size-body-large, 1.25rem)';
export const bodyLargeLineHeight = 'var(--rothko-line-height-body-large, 1.75rem)';
export const bodyFontSize = 'var(--rothko-font-size-body, 1rem)';
export const bodyLineHeight = 'var(--rothko-line-height-body, 1.5rem)';
export const bodySmallFontSize = 'var(--rothko-font-size-body-small, 0.875rem)';
export const bodySmallLineHeight = 'var(--rothko-line-height-body-small, 1.25rem)';
export const bodyXSmallFontSize = 'var(--rothko-font-size-body-xsmall, 0.75rem)';
export const bodyXSmallLineHeight = 'var(--rothko-line-height-body-xsmall, 0.9375rem)';

export const getTheme = (kind: RothkoKind, scale: RothkoKindScale | null = null): string => {
  return scale === null ? rothkoDefaultKinds[kind] : rothkoScaledKinds[`${kind}-${scale}`];
};

export const getThemeForeground = (kind: RothkoKind): string => {
  return rothkoKindForegrounds[kind];
};
