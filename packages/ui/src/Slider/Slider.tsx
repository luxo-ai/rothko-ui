import type { Nullable } from '@rothko-ui/utils';
import React, { useCallback, useMemo } from 'react';
import type { RothkoKind } from '../Theme';
import { useKindTheme } from '../Theme';
import Typography from '../Typography';
import type { SliderWidth } from './Common';
import { SliderContainer, SliderRange, SliderTrack } from './Common';
import { SliderHandle } from './SliderHandle';
import { getOffsetFactory } from './sliderUtils';

type SliderProps = {
  min?: number;
  max: number;
  onChange: (v: number) => void;
  kind?: RothkoKind;
  value?: Nullable<number>;
  minWidth?: SliderWidth;
  maxWidth?: SliderWidth;
  className?: string;
  label?: string;
  disabled?: boolean;
  precision?: number;
  orMore?: boolean;
  postfix?: string;
};

export const Slider = ({
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
}: SliderProps) => {
  const [colorer, theme] = useKindTheme(kind);
  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  const localVal = useMemo(() => {
    return value || min;
  }, [value, min]);

  const maxReached = localVal >= max;
  return (
    <SliderContainer mw={maxWidth} nw={minWidth ?? maxWidth} className={className}>
      <div className="flex justify-between gap-2 mb3">
        {label && <Typography.label light>{label}</Typography.label>}
        <Typography.label light>
          {localVal.toFixed(precision)}
          {postfix ?? ''}
          {maxReached && orMore ? '+' : ''}
        </Typography.label>
      </div>
      <SliderTrack className="flex flex-row items-center relative w-100" aemikoTheme={theme}>
        <SliderHandle
          id="slider-handle"
          className="absolute"
          ariaLabel="slider handle value"
          kind={kind}
          onChange={v => onChange(v)}
          value={localVal}
          min={min}
          max={max}
          disabled={disabled}
        />
        <SliderRange
          className="absolute"
          style={{ width: getOffset(localVal) }}
          themeColorer={colorer}
        />
      </SliderTrack>
    </SliderContainer>
  );
};
