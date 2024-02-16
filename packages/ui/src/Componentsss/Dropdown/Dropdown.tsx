import React from 'react';
import type { Value } from '../../Library/types';
import DropdownInner from './DropdownInner';
import type { DropdownInnerProps } from './types';

type DropdownProps<V extends Value, T> = Omit<
  DropdownInnerProps<V, T>,
  'multiple' | 'value' | 'onChange'
> & {
  /** Current value of dropdown or value array if multiple */
  value?: V | null;
  /** event handler for value change */
  onChange: (v: V | null) => void;
};

function Dropdown<V extends Value, T = undefined>({
  onChange,
  value,
  ...props
}: DropdownProps<V, T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DropdownInner {...props} value={value} onChange={onChange as any} multiple={false} />;
}

export default Dropdown;
