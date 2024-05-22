import React from 'react';
import type { Value } from '../../library/types';
import SelectInner from './SelectInner';
import type { SelectInnerProps } from './types';

type MultiSelectProps<V extends Value, T> = Omit<
  SelectInnerProps<V, T>,
  'multiple' | 'value' | 'onChange' | 'search' | 'noResultsMessage'
> & {
  /** Current value of select or value array if multiple */
  values?: V[] | null;
  /** event handler for value change */
  onChange: (v: V[] | null) => void;
};

function MultiSelect<V extends Value, T = undefined>({
  onChange,
  values: value,
  ...props
}: MultiSelectProps<V, T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <SelectInner {...props} value={value} onChange={onChange as any} multiple />;
}

export default MultiSelect;
