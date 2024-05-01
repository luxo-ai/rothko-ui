import { classes, isString } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React from 'react';
import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import Typography from '../Typography/Typography';
import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
  WithAriaErrorMessage,
} from '../../types';
import useId from '../../library/hooks/useId';
import styles from './Checkbox.module.scss';

type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHasPopup<
      WithAriaExpanded<
        WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
      >
    >
  >
>;

type CheckboxProps = WithAria<{
  id?: string;
  /**
   * Specifies whether the checkbox is checked.
   */
  checked?: boolean;
  /**
   * The content to be displayed inside the checkbox.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the checkbox.
   */
  className?: string;
  /**
   * Specifies whether the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether there is an error with the checkbox.
   */
  error?: boolean;
  /**
   * The error text to be displayed when there is an error.
   * @default: 'Invalid'
   */
  errorText?: string;
  /**
   * The visual style of the checkbox.
   */
  kind?: RothkoKind;
  /**
   * The callback function called when the checkbox value changes.
   */
  onChange?: (val: boolean) => void;
  /**
   * Specifies whether the checkbox is required.
   */
  required?: boolean;
  /**
   * The inline style for the checkbox.
   */
  style?: React.CSSProperties;
}>;

const Checkbox = ({
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded,
  'aria-disabled': ariaDisabled,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  'aria-errormessage': ariaErrorMessage,
  checked,
  children,
  className,
  disabled,
  error,
  kind,
  onChange,
  style,
  errorText = 'Invalid',
}: // required,
CheckboxProps) => {
  const errorMessageId = useId();
  const labelId = useId();

  const clickCheckbox = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: clickCheckbox });

  return (
    <div style={style} className={classes(styles['checkbox-container'], className)}>
      <div
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && children ? labelId : ariaLabelledBy}
        aria-hidden={ariaHidden}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
        aria-expanded={ariaExpanded}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-checked={!!checked}
        aria-disabled={ariaDisabled || disabled}
        aria-label={ariaLabel}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        className={classes(
          styles[kind ? `checkbox--${kind}` : 'checkbox'],
          error && styles['error'],
          checked && styles['checked'],
          disabled && styles['disabled']
        )}
        onClick={() => clickCheckbox()}
        onKeyDown={onKeyDown}
        role="checkbox"
        tabIndex={0}
      />
      {children &&
        (isString(children) ? (
          <Typography.body id={labelId}>{children}</Typography.body>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
      {error && (
        <Typography.body id={errorMessageId} kind="danger">
          {errorText}
        </Typography.body>
      )}
    </div>
  );
};

export default Checkbox;
