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
import useId from '../../library/hooks/useId';

const BUFFER = 1;

export type Range = [number, number];

type WithAria<T> = WithAriaRequired<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>;

type MultiSliderProps = WithAria<{
  id?: string;
  /**
   * The CSS class name for the MultiSlider component.
   */
  className?: string;
  /**
   * Specifies whether the MultiSlider component is disabled.
   */
  disabled?: boolean;
  /**
   * The kind of MultiSlider component.
   */
  kind?: RothkoKind;
  /**
   * The label for the MultiSlider component.
   */
  label?: string;
  /**
   * The maximum value of the MultiSlider component.
   */
  max: number;
  /**
   * The maximum width of the MultiSlider component.
   * @default '100%'
   */
  maxWidth?: SliderWidth;
  /**
   * The minimum value of the MultiSlider component.
   * @default 0
   */
  min?: number;
  /**
   * The minimum width of the MultiSlider component.
   */
  minWidth?: SliderWidth;
  /**
   * The callback function that is called when the value of the MultiSlider component changes.
   * @param r The range of the MultiSlider component.
   */
  onChange: (r: Range) => void;
  /**
   * Specifies whether the MultiSlider component allows values greater than the maximum value.
   */
  orMore?: boolean;
  /**
   * The the format of the range values displayed.
   */
  valueFormat?: string;
  /**
   * The precision of the range values displayed.
   * @default 0
   */
  precision?: number;
  /**
   * Specifies whether to show the range values.
   */
  showRange?: boolean;
  /**
   * The inline style for the MultiSlider component.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the MultiSlider component.
   */
  value?: Nullable<Range>;
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
  // valueFormat,
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
