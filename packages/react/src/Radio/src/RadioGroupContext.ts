import type { RothkoKind } from '@rothko-ui/system';
import { createContext } from 'react';

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
