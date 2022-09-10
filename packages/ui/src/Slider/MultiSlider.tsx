import { Nullable } from '@aemiko/utils';
import React, { useCallback, useMemo } from 'react';
import { Text } from '../Text';
import { AemikoKind, useKindTheme } from '../Theme';
import { SliderContainer, SliderRange, SliderTrack, SliderWidth } from './Common';
import { SliderHandle } from './SliderHandle';
import { getOffsetFactory } from './sliderUtils';

const BUFFER = 3;

export type Range = [number, number];

type MultiSliderProps = {
  min?: number;
  max: number;
  onChange: (r: Range) => void;
  kind?: AemikoKind;
  value?: Nullable<Range>;
  minWidth?: SliderWidth;
  maxWidth?: SliderWidth;
  className?: string;
  label?: string;
  disabled?: boolean;
  precision?: number;
  orMore?: boolean;
  postfix?: string;
};

export const MultiSlider = ({
  onChange,
  value,
  max,
  disabled,
  className,
  label,
  orMore,
  minWidth,
  postfix,
  kind = 'info',
  maxWidth = '100%',
  min = 0,
  precision = 0,
}: MultiSliderProps) => {
  const [colorer, theme] = useKindTheme(kind);
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const [lower, upper] = useMemo(() => {
    return value ? value : [min, max];
  }, [value, min, max]);

  const maxReached = upper >= max;

  return (
    <SliderContainer mw={maxWidth} nw={minWidth ?? maxWidth} className={className}>
      <div className="flex justify-between gap-2 mb3">
        {label && <Text.labelLite kind="black">{label}</Text.labelLite>}
        <Text.labelLite kind="black">
          {lower.toFixed(precision)} - {upper.toFixed(precision)}
          {postfix ?? ''}
          {maxReached && orMore ? '+' : ''}
        </Text.labelLite>
      </div>
      <SliderTrack className="flex flex-row items-center relative w-100" aemikoTheme={theme}>
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
        <SliderRange
          className="absolute"
          style={{
            left: getOffset(lower),
            width: getOffset(upper - lower),
          }}
          themeColorer={colorer}
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
      </SliderTrack>
    </SliderContainer>
  );
};
