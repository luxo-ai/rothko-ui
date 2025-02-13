import React from 'react';
import type { Value } from '@rothko-ui/system';
import SelectInner from './SelectInner';
import type { SelectInnerProps } from './SelectInner';

type SelectProps<V extends Value, T> = Omit<
  SelectInnerProps<V, T>,
  'multiple' | 'value' | 'onChange' | 'onDelete'
> & {
  /** Current value of select or value array if multiple */
  value?: V | null;
  /** event handler for value change */
  onChange: (v: V | null) => void;
};

function Select<V extends Value, T = undefined>({ onChange, value, ...props }: SelectProps<V, T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/jsx-props-no-spreading
  return <SelectInner {...props} value={value} onChange={onChange as any} multiple={false} />;
}

export default Select;
