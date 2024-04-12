import React from 'react';
import type { RadioInnerProps } from './RadioInner';
import RadioInner from './RadioInner';
import useRadioGroup from './useRadioGroup';

type RadioProps = Pick<
  RadioInnerProps,
  | 'id'
  | 'children'
  | 'className'
  | 'disabled'
  | 'style'
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'aria-errormessage'
> & {
  $key: string;
};

const Radio = ({
  id,
  $key,
  children,
  className,
  disabled,
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-controls': ariaControls,
  'aria-errormessage': ariaErrorMessage,
}: RadioProps) => {
  const childrenStringLabel = typeof children === 'string' ? children : undefined;
  const {
    radioGroupErrorId,
    selectedValue,
    onChange,
    error,
    disabled: groupDisabled,
    kind,
  } = useRadioGroup();

  return (
    <RadioInner
      aria-controls={ariaControls}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-errormessage={!ariaErrorMessage && error ? radioGroupErrorId : ariaErrorMessage}
      aria-label={ariaLabel || childrenStringLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      disabled={disabled || groupDisabled}
      error={error}
      id={id}
      kind={kind}
      onSelect={() => onChange($key)}
      selected={$key === selectedValue}
      style={style}
    >
      {children}
    </RadioInner>
  );
};

export default Radio;
