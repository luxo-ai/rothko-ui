import type { Nullable } from '@rothko-ui/utils';
import React, { useMemo } from 'react';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import { SliderContainerDiv, SliderRangeDiv, SliderTrackDiv } from './Shared';
import { SliderLegendContainerDiv } from './Shared/SliderContainer';
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

type WithAria<T> = WithAriaRequired<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>;

type SliderProps = WithAria<{
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
  onChange: (v: number) => void;
  orMore?: boolean;
  postfix?: string;
  precision?: number;
  value?: Nullable<number>;
  showValue?: boolean;
}>;

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
  postfix,
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
}: SliderProps) => {
  const trackId = useId();
  const labelId = useId();

  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);

  const localVal = useMemo(() => {
    return value || min;
  }, [value, min]);

  const maxReached = localVal >= max;

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
        {showValue && (
          <Typography.label light>
            {localVal.toFixed(precision)}
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
          aria-controls={ariaControls}
          aria-label="Slider"
          disabled={disabled}
          kind={kind}
          max={max}
          min={min}
          onChange={v => {
            if (disabled) return;
            onChange(v);
          }}
          value={localVal}
        />
        <SliderRangeDiv $disabled={disabled} kind={kind} style={{ width: getOffset(localVal) }} />
      </SliderTrackDiv>
    </SliderContainerDiv>
  );
};

export default Slider;
