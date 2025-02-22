import type { Nilable, RothkoKind, WithAria } from '@rothko-ui/system';
import { useId } from '@rothko-ui/system';
import React, { useMemo } from 'react';

import { SliderRange, SliderTrack, SliderHandle, SliderHandleInner } from './Shared';
import type { SliderHandleProps } from './Shared';
import { getOffsetFactory } from './sliderUtils';

const BUFFER = 1;

type Range = [number, number];

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'aria-invalid'
  | 'aria-required';

type MultiSliderProps = {
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
   * The maximum value of the MultiSlider component.
   */
  max: number;
  /**
   * The minimum value of the MultiSlider component.
   * @default 0
   */
  min?: number;
  /**
   * The callback function that is called when the value of the MultiSlider component changes.
   * @param r The range of the MultiSlider component.
   */
  onChange: (r: Range) => void;
  /**
   * The inline style for the MultiSlider component.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the MultiSlider component.
   */
  value?: Nilable<Range>;
  /**
   * The slider handle.
   */
  children?: React.ReactElement<SliderHandleProps>;
};

export const MultiSlider = ({
  className,
  disabled,
  kind,
  max,
  min = 0,
  onChange,
  value,
  id,
  style,
  children,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
}: WithAria<MultiSliderProps, AriaAttributes>) => {
  const trackId = useId(id);
  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);
  const [lower, upper] = useMemo(() => (value ? value : [min, max]), [value, min, max]);

  // validation
  const childHandle = useMemo(() => {
    if (!children) {
      return null;
    }
    if (React.Children.count(children) !== 1) {
      throw new Error('MultiSlider requires exactly one child');
    }
    if (!React.isValidElement(children)) {
      throw new Error('MultiSlider requires child to be valid React element');
    }
    return children;
  }, [children]);

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
        value={lower}
        onChange={v => {
          if (disabled) return;
          if (v + BUFFER >= upper) return;
          onChange([v, upper]);
        }}
      >
        {childHandle ? childHandle : <SliderHandle />}
      </SliderHandleInner>
      <SliderRange
        disabled={disabled}
        kind={kind}
        style={{
          left: getOffset(lower),
          width: getOffset(upper - lower),
        }}
      />
      <SliderHandleInner
        aria-controls={ariaControls}
        disabled={disabled}
        max={max}
        min={min}
        value={upper}
        onChange={v => {
          if (disabled) return;
          if (v - BUFFER <= lower) return;
          onChange([lower, v]);
        }}
      >
        {childHandle ? childHandle : <SliderHandle />}
      </SliderHandleInner>
    </SliderTrack>
  );
};
