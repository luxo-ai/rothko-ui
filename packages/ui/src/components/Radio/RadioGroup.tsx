import React from 'react';
import styled from 'styled-components';
import { Grid } from '../../layout';
import { LabelText } from '../../library/Common';
import type { RothkoKind } from '../../theme';
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

type RadioGroupProps<K extends string> = WithAria<{
  id?: string;
  /**
   * The content to be rendered inside the RadioGroup.
   */
  children: React.ReactNode;
  /**
   * The CSS class name for the RadioGroup.
   */
  className?: string;
  /**
   * The gap between columns in the RadioGroup.
   * @default '0.5rem'
   */
  columnGap?: RemSize | EmSize | number;
  /**
   * Specifies whether the RadioGroup is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether the RadioGroup has an error state.
   */
  error?: boolean;
  /**
   * The error message to be displayed when the RadioGroup has an error state.
   * @default 'Invalid'
   */
  errorText?: string;
  /**
   * The gap between elements in the RadioGroup.
   */
  gap?: RemSize | EmSize | number;
  /**
   * The visual style of the RadioGroup.
   */
  kind?: RothkoKind;
  /**
   * The label for the RadioGroup.
   */
  label?: string;
  /**
   * The maximum number of columns in the RadioGroup.
   * @default 4
   */
  maxCol?: number;
  /**
   * The callback function called when the value of the RadioGroup changes.
   * @param $key - The new value of the RadioGroup.
   */
  onChange: ($key: K) => void;
  /**
   * Specifies whether the RadioGroup is required.
   */
  required?: boolean;
  /**
   * The gap between rows in the RadioGroup.
   * @default '0.5rem'
   */
  rowGap?: RemSize | EmSize | number;
  /**
   * The inline style for the RadioGroup.
   */
  style?: React.CSSProperties;
  /**
   * The current value of the RadioGroup.
   */
  value?: K | null;
}>;

function RadioGroup<K extends string>({
  id,
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
}: // required,
RadioGroupProps<K>) {
  const labelId = useId();
  const errorMessageId = useId();

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
