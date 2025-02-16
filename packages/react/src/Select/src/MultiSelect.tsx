import type { Value } from '@rothko-ui/system';
import React from 'react';

import SelectInner from './SelectInner';
import type { SelectInnerProps } from './SelectInner';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/jsx-props-no-spreading
  return <SelectInner {...props} value={value} onChange={onChange as any} multiple />;
}

export default MultiSelect;
