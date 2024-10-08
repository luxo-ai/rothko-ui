import type { Nilable } from '@rothko-ui/utils';
import React, { useMemo } from 'react';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import { SliderContainer, SliderRange, SliderTrack } from './Shared';
import { SliderLegendContainer } from './Shared/SliderContainer';
import SliderHandle from './Shared/SliderHandle';
import { getOffsetFactory } from './sliderUtils';
import type { SliderWidth } from './types';
import useId from '../../library/hooks/useId';
import type { WithAria } from '../../types';

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'aria-invalid'
  | 'aria-required';

type SliderProps = {
  id?: string;
  /**
   * The class name for the Slider component.
   */
  className?: string;
  /**
   * Specifies whether the Slider component is disabled.
   */
  disabled?: boolean;
  /**
   * The kind of Slider component.
   */
  kind?: RothkoKind;
  /**
   * The label for the Slider component.
   */
  label?: string;
  /**
   * The maximum value of the Slider component.
   */
  max: number;
  /**
   * The maximum width of the Slider component.
   */
  maxWidth?: SliderWidth;
  /**
   * The minimum value of the Slider component.
   * @default 0
   */
  min?: number;
  /**
   * The minimum width of the Slider component.
   * @default '100%'
   */
  minWidth?: SliderWidth;
  /**
   * The callback function that is called when the value of the Slider component changes.
   * @param v - The new value of the Slider component.
   */
  onChange: (v: number) => void;
  /**
   * Specifies whether the Slider component can have a value greater than the maximum value.
   */
  orMore?: boolean;
  /**
   * The format of the value displayed by the Slider component.
   */
  valueFormat?: string;
  /**
   * The precision of the value displayed by the Slider component.
   * @default 0
   */
  precision?: number;
  /**
   * Specifies whether to show the value of the Slider component.
   */
  showValue?: boolean;
  /**
   * The inline style for the Slider component.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the Slider component.
   */
  value?: Nilable<number>;
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
  // valueFormat,
  precision = 0,
  showValue,
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
}: WithAria<SliderProps, AriaAttributes>) => {
  const trackId = useId();
  const labelId = useId();

  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);

  const localVal = useMemo(() => value || min, [value, min]);

  const maxReached = localVal >= max;

  return (
    <SliderContainer
      id={id}
      maxWidth={maxWidth}
      minWidth={minWidth || maxWidth}
      className={className}
      style={style}
    >
      <SliderLegendContainer>
        {label && (
          <Typography.label id={labelId} light>
            {label}
          </Typography.label>
        )}
        {showValue && (
          <Typography.label light>
            {localVal.toFixed(precision)}
            {maxReached && orMore ? '+' : ''}
          </Typography.label>
        )}
      </SliderLegendContainer>
      <SliderTrack
        id={trackId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        aria-disabled={disabled}
        aria-orientation="horizontal"
        disabled={disabled}
      >
        <SliderHandle
          aria-controls={ariaControls}
          aria-label="Slider"
          disabled={disabled}
          max={max}
          min={min}
          onChange={v => {
            if (disabled) return;
            onChange(v);
          }}
          value={localVal}
        />
        <SliderRange disabled={disabled} kind={kind} style={{ width: getOffset(localVal) }} />
      </SliderTrack>
    </SliderContainer>
  );
};

export default Slider;
