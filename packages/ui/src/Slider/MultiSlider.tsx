import type { Nullable } from '@rothko-ui/utils';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import type { RothkoKind } from '../Theme/types';
import Typography from '../Typography';
import type { SliderWidth } from './Common';
import { SliderContainer, SliderRange, SliderTrack } from './Common';
import { SliderHandle } from './SliderHandle';
import { getOffsetFactory } from './sliderUtils';

const BUFFER = 3;

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
};

const MultiSlider = ({
  className,
  disabled,
  kind = 'info',
  label,
  max,
  maxWidth = '100%',
  min = 0,
  minWidth,
  onChange,
  orMore,
  postfix,
  precision = 0,
  value,
}: MultiSliderProps) => {
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const [lower, upper] = useMemo(() => {
    return value ? value : [min, max];
  }, [value, min, max]);

  const maxReached = upper >= max;

  return (
    <SliderContainer mw={maxWidth} nw={minWidth ?? maxWidth} className={className}>
      <SliderLegendContainerDiv>
        {label && <Typography.label light>{label}</Typography.label>}
        <Typography.label light>
          {lower.toFixed(precision)} - {upper.toFixed(precision)}
          {postfix ?? ''}
          {maxReached && orMore ? '+' : ''}
        </Typography.label>
      </SliderLegendContainerDiv>
      <MultiSliderTrack>
        <SliderHandle
          id="multi-slider-handle-min"
          className="absolute"
          ariaLabel="slider handle min value"
          kind={kind}
          onChange={v => {
            if (v + BUFFER >= upper) return;
            onChange([v, upper]);
          }}
          value={lower}
          min={min}
          max={max}
          disabled={disabled}
        />
        <MultiSliderRange
          className="absolute"
          kind={kind}
          style={{
            left: getOffset(lower),
            width: getOffset(upper - lower),
          }}
        />
        <SliderHandle
          id="multi-slider-handle-max"
          className="absolute"
          ariaLabel="slider handle max value"
          kind={kind}
          onChange={v => {
            if (v - BUFFER <= lower) return;
            onChange([lower, v]);
          }}
          value={upper}
          min={min}
          max={max}
          disabled={disabled}
        />
      </MultiSliderTrack>
    </SliderContainer>
  );
};

const MultiSliderRange = styled(SliderRange)`
  position: absolute;
`;

const MultiSliderTrack = styled(SliderTrack)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SliderLegendContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  margin-bottom: 1rem;
`;

export default MultiSlider;
