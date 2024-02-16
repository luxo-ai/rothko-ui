import type { Nullable } from '@rothko-ui/utils';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import { SliderContainerDiv, SliderRangeDiv, SliderTrackDiv } from './Shared';
import { SliderHandle } from './Shared/SliderHandle';
import { getOffsetFactory } from './sliderUtils';
import type { SliderWidth } from './types';

const BUFFER = 1;

export type Range = [number, number];

type MultiSliderProps = {
  className?: string;
  disabled?: boolean;
  kind?: RothkoKind;
  label?: string;
  max: number;
  maxWidth?: SliderWidth;
  min?: number;
  minWidth?: SliderWidth;
  onChange: (r: Range) => void;
  orMore?: boolean;
  postfix?: string;
  precision?: number;
  value?: Nullable<Range>;
  showRange?: boolean;
};

const MultiSlider = ({
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
  showRange,
  value,
}: MultiSliderProps) => {
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const [lower, upper] = useMemo(() => {
    return value ? value : [min, max];
  }, [value, min, max]);

  const maxReached = upper >= max;

  return (
    <SliderContainerDiv $maxWidth={maxWidth} $minWidth={minWidth || maxWidth} className={className}>
      <SliderLegendContainerDiv>
        {label && <Typography.label light>{label}</Typography.label>}
        {showRange && (
          <Typography.label light>
            {lower.toFixed(precision)} - {upper.toFixed(precision)}
            {postfix ?? ''}
            {maxReached && orMore ? '+' : ''}
          </Typography.label>
        )}
      </SliderLegendContainerDiv>
      <SliderTrackDiv $disabled={disabled}>
        <SliderHandle
          ariaLabel="slider min value"
          disabled={disabled}
          kind={kind}
          max={max}
          min={min}
          value={lower}
          onChange={v => {
            if (disabled) return;
            if (v + BUFFER >= upper) return;
            onChange([v, upper]);
          }}
        />
        <SliderRangeDiv
          $disabled={disabled}
          kind={kind}
          style={{
            left: getOffset(lower),
            width: getOffset(upper - lower),
          }}
        />
        <SliderHandle
          ariaLabel="slider max value"
          disabled={disabled}
          kind={kind}
          max={max}
          min={min}
          value={upper}
          onChange={v => {
            if (disabled) return;
            if (v - BUFFER <= lower) return;
            onChange([lower, v]);
          }}
        />
      </SliderTrackDiv>
    </SliderContainerDiv>
  );
};

const SliderLegendContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default MultiSlider;
