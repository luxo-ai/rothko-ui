import keyboardKey from 'keyboard-key';
import React from 'react';

import { classes, scopedClasses as sc, isString } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import Typography from '../Typography/Typography';
import useId from '../../library/hooks/useId';
import styles from './Checkbox.module.scss';
import type { WithAria } from './types';

const scoppedClasses = sc(styles);

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
   * @default: 'success'
   */
  kind?: RothkoKind;
  /**
   * The callback function called when the checkbox value changes.
   */
  onChange?: (v: boolean) => void;
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
  kind = 'success',
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

  const baseClassses = scoppedClasses(
    'checkbox',
    `checkbox--${kind}`,
    error && 'error',
    checked && 'selected',
    disabled && 'disabled'
  );

  return (
    <div style={style} className={classes(styles['checkbox__container'], className)}>
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
        className={baseClassses}
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
