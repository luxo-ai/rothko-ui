import type { Accessory } from '../../library/types';

export type Icon = React.ReactNode | Accessory<{ open: boolean; disabled: boolean }>;
