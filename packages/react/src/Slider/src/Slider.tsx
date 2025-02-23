import type { WithAria, Nilable, RothkoKind } from '@rothko-ui/system';
import { useId } from '@rothko-ui/system';
import React, { useMemo } from 'react';

import { SliderRange, SliderTrack, SliderHandleInner, SliderHandle } from './Shared';
import type { SliderHandleProps } from './Shared';
import { getOffsetFactory } from './sliderUtils';
import { useValidateHandle } from './useValidateHandle';

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
   * CSS class name(s).
   */
  className?: string;
  /**
   * Specifies whether the slider is disabled.
   */
  disabled?: boolean;
  /**
   * The semantic style of the slider.
   */
  kind?: RothkoKind;
  /**
   * The maximum value of the slider.
   */
  max: number;
  /**
   * The minimum value of the slider.
   * @default 0
   */
  min?: number;
  /**
   * The callback function that is called when the value of the slider changes.
   * @param v - The new value of the slider.
   */
  onChange: (v: number) => void;
  /**
   * The inline style for the slider.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the slider.
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
  const childHandle = useValidateHandle(children);
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
        {childHandle ? childHandle : <SliderHandle />}
      </SliderHandleInner>
      <SliderRange disabled={disabled} kind={kind} style={{ width: getOffset(localVal) }} />
    </SliderTrack>
  );
};

export default Slider;
