import type { WithAria, Nilable, RothkoKind } from '@rothko-ui/system';
import React, { useMemo } from 'react';
import { SliderRange, SliderTrack, SliderHandleInner, SliderHandle } from './Shared';
import { getOffsetFactory } from './sliderUtils';
import { useId } from '@rothko-ui/system';
import type { SliderHandleProps } from './Shared';

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
   * The maximum value of the Slider component.
   */
  max: number;
  /**
   * The minimum value of the Slider component.
   * @default 0
   */
  min?: number;
  /**
   * The callback function that is called when the value of the Slider component changes.
   * @param v - The new value of the Slider component.
   */
  onChange: (v: number) => void;
  /**
   * The precision of the value.
   * @default 0
   */
  precision?: number;
  /**
   * The inline style for the Slider component.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the Slider component.
   */
  value?: Nilable<number>;
  /**
   * The slider handle.
   */
  children?: React.ReactElement<SliderHandleProps>;
};

export const Slider = ({
  className,
  disabled,
  kind,
  max,
  min = 0,
  precision, // use in the onChange?
  onChange,
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
  children,
}: WithAria<SliderProps, AriaAttributes>) => {
  const trackId = useId(id);
  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);
  const localVal = useMemo(() => value || min, [value, min]);
  return (
    <SliderTrack
      id={trackId}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      aria-disabled={disabled}
      aria-orientation="horizontal"
      disabled={disabled}
      className={className}
      style={style}
    >
      <SliderHandleInner
        aria-controls={ariaControls}
        disabled={disabled}
        max={max}
        min={min}
        onChange={v => {
          if (disabled) return;
          onChange(v);
        }}
        value={localVal}
      >
        {children ? children : <SliderHandle />}
      </SliderHandleInner>
      <SliderRange disabled={disabled} kind={kind} style={{ width: getOffset(localVal) }} />
    </SliderTrack>
  );
};

export default Slider;
