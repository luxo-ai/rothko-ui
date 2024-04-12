import React from 'react';
import styled from 'styled-components';
import { Grid } from '../../layout';
import { LabelText } from '../../library/Common';
import type { KindProps } from '../../theme';
import type {
  EmSize,
  RemSize,
  WithAriaControls,
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';
import useId from '../../library/hooks/useId';
import { Typography } from '../Typography';
import type { RadioGroupContextType } from './RadioGroupContext';
import RadioGroupContext from './RadioGroupContext';

const RadioGroupContainerDiv = styled.div``;

type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
  >
>;

type RadioGroupProps<K extends string> = KindProps &
  WithAria<{
    required?: boolean;
    className?: string;
    id?: string;
    maxCol?: number;
    onChange: ($key: K) => void;
    columnGap?: RemSize | EmSize | number;
    rowGap?: RemSize | EmSize | number;
    gap?: RemSize | EmSize | number;
    style?: React.CSSProperties;
    value?: K | null;
    error?: boolean;
    errorText?: string;
    label?: string;
    disabled?: boolean;
    children: React.ReactNode;
  }>;

function RadioGroup<K extends string>({
  id: idProp,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-disabled': ariaDisabled,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  'aria-errormessage': ariaErrorMessage,
  errorText = 'Invalid',
  style,
  className,
  maxCol = 4,
  columnGap = '0.5rem',
  rowGap = '0.5rem',
  value,
  kind,
  onChange,
  error,
  label,
  disabled,
  children,
  required,
}: RadioGroupProps<K>) {
  const id = useId(idProp);
  const labelId = `${id}-label`;
  const errorMessageId = `${id}-error-text`;

  const contextValue = React.useMemo(
    () => ({
      radioGroupLabelId: labelId,
      radioGroupErrorId: errorMessageId,
      selectedValue: value,
      onChange,
      error,
      kind,
      disabled,
    }),
    [value, error, kind, labelId, errorMessageId, disabled, onChange]
  );

  return (
    <RadioGroupContainerDiv id={id} style={style} className={className}>
      {label && <LabelText id={labelId}>{label}</LabelText>}
      <Grid
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        aria-hidden={ariaHidden}
        aria-invalid={ariaInvalid || error}
        aria-controls={ariaControls}
        aria-disabled={ariaDisabled}
        aria-required={ariaRequired}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        role="radiogroup"
        flexGrow={1}
        gridTemplateColumns={`repeat(${maxCol}, 1fr)`}
        rowGap={rowGap}
        columnGap={columnGap}
      >
        <RadioGroupContext.Provider value={contextValue as RadioGroupContextType}>
          {children}
        </RadioGroupContext.Provider>
      </Grid>
      {error && (
        <Typography.body id={errorMessageId} kind="danger">
          {errorText}
        </Typography.body>
      )}
    </RadioGroupContainerDiv>
  );
}

export default RadioGroup;
