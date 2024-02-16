import type { Nullable } from '@rothko-ui/utils';
import React, { useCallback, useMemo } from 'react';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import { SliderContainerDiv, SliderRangeDiv, SliderTrackDiv } from './Shared';
import { SliderLegendContainerDiv } from './Shared/SliderContainer';
import { SliderHandle } from './Shared/SliderHandle';
import { getOffsetFactory } from './sliderUtils';
import type { SliderWidth } from './types';

type SliderProps = {
  className?: string;
  disabled?: boolean;
  kind?: RothkoKind;
  label?: string;
  max: number;
  maxWidth?: SliderWidth;
  min?: number;
  minWidth?: SliderWidth;
  onChange: (v: number) => void;
  orMore?: boolean;
  postfix?: string;
  precision?: number;
  value?: Nullable<number>;
  showValue?: boolean;
};

const Slider = ({
  className,
  disabled,
  kind,
  label,
  max,
  maxWidth = '100%',
  min = 0,
  minWidth,
  onChange,
  orMore,
  postfix,
  precision = 0,
  showValue,
  value,
}: SliderProps) => {
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const localVal = useMemo(() => {
    return value || min;
  }, [value, min]);

  const maxReached = localVal >= max;

  return (
    <SliderContainerDiv $maxWidth={maxWidth} $minWidth={minWidth || maxWidth} className={className}>
      <SliderLegendContainerDiv>
        {label && <Typography.label light>{label}</Typography.label>}
        {showValue && (
          <Typography.label light>
            {localVal.toFixed(precision)}
            {postfix ?? ''}
            {maxReached && orMore ? '+' : ''}
          </Typography.label>
        )}
      </SliderLegendContainerDiv>
      <SliderTrackDiv $disabled={disabled}>
        <SliderHandle
          ariaLabel="slider handle value"
          disabled={disabled}
          kind={kind}
          max={max}
          min={min}
          onChange={v => {
            if (disabled) return;
            onChange(v);
          }}
          value={localVal}
        />
        <SliderRangeDiv $disabled={disabled} kind={kind} style={{ width: getOffset(localVal) }} />
      </SliderTrackDiv>
    </SliderContainerDiv>
  );
};

export default Slider;
