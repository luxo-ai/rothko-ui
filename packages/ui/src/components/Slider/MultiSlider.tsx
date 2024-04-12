import type { Nullable } from '@rothko-ui/utils';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import { SliderContainerDiv, SliderRangeDiv, SliderTrackDiv } from './Shared';
import { SliderHandle } from './Shared/SliderHandle';
import { getOffsetFactory } from './sliderUtils';
import type { SliderWidth } from './types';
import type {
  WithAriaControls,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';
import useId from '../../library/Hooks/useId';

const BUFFER = 1;

export type Range = [number, number];

type WithAria<T> = WithAriaRequired<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>;

type MultiSliderProps = WithAria<{
  id?: string;
  className?: string;
  style?: React.CSSProperties;
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
}>;

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
  id,
  style,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
}: MultiSliderProps) => {
  const trackId = useId();
  const labelId = useId();

  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);

  const [lower, upper] = useMemo(() => {
    return value ? value : [min, max];
  }, [value, min, max]);

  const maxReached = upper >= max;

  return (
    <SliderContainerDiv
      id={id}
      $maxWidth={maxWidth}
      $minWidth={minWidth || maxWidth}
      className={className}
      style={style}
    >
      <SliderLegendContainerDiv>
        {label && (
          <Typography.label id={labelId} light>
            {label}
          </Typography.label>
        )}
        {showRange && (
          <Typography.label light>
            {lower.toFixed(precision)} - {upper.toFixed(precision)}
            {postfix ?? ''}
            {maxReached && orMore ? '+' : ''}
          </Typography.label>
        )}
      </SliderLegendContainerDiv>
      <SliderTrackDiv
        id={trackId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        aria-disabled={disabled}
        aria-orientation="horizontal"
        $disabled={disabled}
      >
        <SliderHandle
          aria-label="Min Slider"
          aria-controls={ariaControls}
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
          aria-label="Max Slider"
          aria-controls={ariaControls}
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
