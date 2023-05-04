import type { Nullable } from '@rothko-ui/utils';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import type { RothkoKind } from '../../Theme';
import Typography from '../Typography/Typography';
import type { SliderWidth } from './Common';
import { SliderContainer, SliderRange, SliderTrack } from './Common';
import { SliderHandle } from './SliderHandle';
import { getOffsetFactory } from './sliderUtils';

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
};

const Slider = ({
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
}: SliderProps) => {
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const localVal = useMemo(() => {
    return value || min;
  }, [value, min]);

  const maxReached = localVal >= max;
  return (
    <SliderContainer mw={maxWidth} nw={minWidth ?? maxWidth} className={className}>
      <SliderLegendContainerDiv>
        {label && <Typography.label light>{label}</Typography.label>}
        <Typography.label light>
          {localVal.toFixed(precision)}
          {postfix ?? ''}
          {maxReached && orMore ? '+' : ''}
        </Typography.label>
      </SliderLegendContainerDiv>
      <SingleSliderTrack>
        <SliderHandle
          ariaLabel="slider handle value"
          disabled={disabled}
          id="slider-handle"
          kind={kind}
          max={max}
          min={min}
          onChange={v => onChange(v)}
          value={localVal}
        />
        <SingleSliderRange kind={kind} style={{ width: getOffset(localVal) }} />
      </SingleSliderTrack>
    </SliderContainer>
  );
};

const SingleSliderRange = styled(SliderRange)`
  position: absolute;
`;

const SingleSliderTrack = styled(SliderTrack)`
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

export default Slider;
