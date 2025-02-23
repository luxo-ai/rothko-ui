import type { Accessory } from '@rothko-ui/system';
import type React from 'react';

export type Icon = React.ReactNode | Accessory<{ open: boolean; disabled: boolean }>;
export type AccordionVariant = 'none' | 'bordered';
