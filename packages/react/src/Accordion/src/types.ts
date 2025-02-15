import type React from 'react';
import type { Accessory } from '@rothko-ui/system';

export type Icon = React.ReactNode | Accessory<{ open: boolean; disabled: boolean }>;
