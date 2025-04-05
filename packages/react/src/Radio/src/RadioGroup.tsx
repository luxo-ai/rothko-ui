import { useId } from '@rothko-ui/system';
import type { RothkoKind, Size, WithAria, Dictionary } from '@rothko-ui/system';
import { Paragraph, Label } from '@rothko-ui/typography';
import React from 'react';

import type { RadioGroupContextType } from './RadioGroupContext';
import RadioGroupContext from './RadioGroupContext';

type StyleableComponents = 'errorText' | 'label';

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-hidden'
  | 'aria-controls'
  | 'aria-disabled'
  | 'aria-invalid'
  | 'aria-required'
  | 'aria-errormessage';

type RadioGroupProps<K extends string> = {
  /**
   * The `id` attribute of the radio group.
   * @type {string}
   */
  id?: string;
  /**
   * The content to be rendered inside the radio group.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Additional class names for the radio group components.
   * @type {Object<StyleableComponents, string>}
   */
  classNames?: Dictionary<StyleableComponents, string>;
  /**
   * The gap between columns in the radio group.
   * @type {Size | number}
   * @default '0.5rem'
   */
  columnGap?: Size | number;
  /**
   * Specifies whether the radio group is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Specifies whether the radio group has an error state.
   */
  error?: boolean;
  /**
   * The error message to be displayed when the radio group has an error state.
   * @type {string}
   * @default 'Invalid'
   */
  errorText?: string;
  /**
   * The gap between elements in the radio group.
   * @type {Size | number}
   * @default '0.5rem'
   */
  gap?: Size | number;
  /**
   * The radio group's semantic style.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * The label for the radio group.
   * @type {string}
   */
  label?: string;
  /**
   * The maximum number of columns in the radio group.
   * @type {number}
   * @default 4
   */
  maxCol?: number;
  /**
   * The callback function called when the value of the radio group changes.
   * @param $key - The new value of the radio group.
   */
  onChange: ($key: K) => void;
  /**
   * Specifies whether the radio group is required.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * The gap between rows in the radio group.
   * @default '0.5rem'
   */
  rowGap?: Size | number;
  /**
   * The inline style for the radio group.
   */
  style?: React.CSSProperties;
  /**
   * Additional inline styles for the radio group components.
   * @type {Object<StyleableComponents, React.CSSProperties>}
   */
  styles?: Dictionary<StyleableComponents, React.CSSProperties>;
  /**
   * The current value of the radio group.
   */
  value?: K | null;
};

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
  styles = {},
  className,
  classNames = {},
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
WithAria<RadioGroupProps<K>, AriaAttributes>) {
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

  const radioGroupVarStyle = {
    '--radio-group-grid-template-col': `repeat(${maxCol}, 1fr)`,
    '--radio-group-row-gap': typeof rowGap === 'number' ? `${rowGap}px` : rowGap,
    '--radio-group-col-gap': typeof columnGap === 'number' ? `${columnGap}px` : columnGap,
  } as React.CSSProperties;

  return (
    <div id={id} style={style} className={className}>
      {label && (
        <Label className={classNames.label} style={styles.label} id={labelId}>
          {label}
        </Label>
      )}
      <div
        className={
          'grow grid grid-cols-(--radio-group-grid-template-col) gap-y-(--radio-group-row-gap) gap-x-(--radio-group-col-gap)'
        }
        style={radioGroupVarStyle}
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
      >
        <RadioGroupContext.Provider value={contextValue as RadioGroupContextType}>
          {children}
        </RadioGroupContext.Provider>
      </div>
      {error && (
        <Paragraph
          className={classNames.errorText}
          style={styles.errorText}
          id={errorMessageId}
          kind="danger"
        >
          {errorText}
        </Paragraph>
      )}
    </div>
  );
}

export default RadioGroup;
