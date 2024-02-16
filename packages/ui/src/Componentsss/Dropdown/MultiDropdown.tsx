import React from 'react';
import type { Value } from '../../Library/types';
import DropdownInner from './DropdownInner';
import type { DropdownInnerProps } from './types';

type MultiDropdownProps<V extends Value, T> = Omit<
  DropdownInnerProps<V, T>,
  'multiple' | 'value' | 'onChange' | 'search' | 'noResultsMessage'
> & {
  /** Current value of dropdown or value array if multiple */
  values?: V[] | null;
  /** event handler for value change */
  onChange: (v: V[] | null) => void;
};

function MutiDropdown<V extends Value, T = undefined>({
  onChange,
  values: value,
  ...props
}: MultiDropdownProps<V, T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DropdownInner {...props} value={value} onChange={onChange as any} multiple />;
}

export default MutiDropdown;
