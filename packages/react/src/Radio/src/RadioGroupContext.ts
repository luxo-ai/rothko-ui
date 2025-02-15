import { createContext } from 'react';
import type { RothkoKind } from '@rothko-ui/system';

export type RadioGroupContextType = {
  radioGroupLabelId: string;
  radioGroupErrorId: string;
  selectedValue?: string | null;
  error?: boolean;
  disabled?: boolean;
  onChange: ($key: string) => void;
  kind?: RothkoKind;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export default RadioGroupContext;
