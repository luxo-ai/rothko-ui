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
   * The precision of the range values displayed.
   * @default 0
   */
  precision?: number;
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
  children?: ReadonlyArray<React.ReactElement<SliderHandleProps>>;
};

export const MultiSlider = ({
  className,
  disabled,
  kind,
  max,
  min = 0,
  onChange,
  // precision,
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

  const [child1, child2] = useMemo(() => {
    if (!children) {
      return [null, null];
    }
    if (React.Children.count(children) !== 2) {
      throw new Error('MultiSlider requires exactly two children');
    }
    const [c1, c2] = React.Children.toArray(children);
    if (!React.isValidElement(c1) || !React.isValidElement(c2)) {
      throw new Error('MultiSlider requires children to be valid React elements');
    }
    return [c1, c2];
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
        {child1 ? child1 : <SliderHandle />}
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
        {child2 ? child2 : <SliderHandle />}
      </SliderHandleInner>
    </SliderTrack>
  );
};
