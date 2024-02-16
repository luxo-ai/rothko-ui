import React from 'react';
import styled from 'styled-components';
import { Grid } from '../../layout';
import { LabelText } from '../../library/Common';
import type { Option, Value } from '../../library/types';
import type { KindProps } from '../../theme';
import type { EmSize, RemSize } from '../../types';
import Radio from './Radio';

const RadioGroupContainerDiv = styled.div``;

type RadioGroupProps<V extends Value> = KindProps & {
  className?: string;
  id?: string;
  maxCol?: number;
  onChange: (id: V) => void;
  columnGap?: RemSize | EmSize | number;
  rowGap?: RemSize | EmSize | number;
  gap?: RemSize | EmSize | number;
  options: Option<V, { disabled?: boolean } | undefined>[];
  style?: React.CSSProperties;
  value?: V | null;
  error?: boolean;
  label?: string;
  disabled?: boolean;
};

function RadioGroup<V extends Value>({
  id,
  style,
  className,
  maxCol = 4,
  options,
  columnGap = '0.5rem',
  rowGap = '0.5rem',
  value,
  kind,
  onChange,
  error,
  label,
  disabled,
}: RadioGroupProps<V>) {
  return (
    <RadioGroupContainerDiv id={id} style={style} className={className}>
      {label && <LabelText>{label}</LabelText>}
      <Grid
        role="radiogroup"
        flexGrow={1}
        gridTemplateColumns={`repeat(${maxCol}, 1fr)`}
        rowGap={rowGap}
        columnGap={columnGap}
      >
        {options.map(o => {
          const dataOptions = 'data' in o ? o?.data : undefined;
          const isDisabled = Boolean(dataOptions?.disabled) || disabled;
          const isSelected = o.id === value;
          return (
            <Radio
              disabled={isDisabled}
              error={error}
              key={o.id}
              kind={kind}
              onSelect={() => onChange(o.id)}
              selected={isSelected}
            >
              {o.label}
            </Radio>
          );
        })}
      </Grid>
    </RadioGroupContainerDiv>
  );
}

export default RadioGroup;
