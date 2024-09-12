import keyboardKey from 'keyboard-key';
import React from 'react';

import { Checkmark } from '@rothko-ui/icons';
import { classes, scopedClasses, isString } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import Typography from '../Typography/Typography';
import useId from '../../library/hooks/useId';
import styles from './Checkbox.module.scss';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

type StyleableComponents = 'errorText' | 'label';

type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-hidden'
  | 'aria-controls'
  | 'aria-haspopup'
  | 'aria-expanded'
  | 'aria-disabled'
  | 'aria-invalid'
  | 'aria-required'
  | 'aria-errormessage';

type CheckboxProps = {
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
   * Additional class names for the checkbox components.
   */
  classNames?: Partial<Record<StyleableComponents, string>>;
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
  onChange?: (v: boolean) => void;
  /**
   * Specifies whether the checkbox is required.
   */
  required?: boolean;
  /**
   * The inline style for the checkbox.
   */
  style?: React.CSSProperties;
  /**
   * Additional inline styles for the checkbox components.
   */
  styles?: Partial<Record<StyleableComponents, React.CSSProperties>>;
};

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
  classNames = {},
  disabled,
  error,
  kind,
  onChange,
  style,
  styles: stylesProp = {},
  errorText = 'Invalid',
}: // required,
WithAria<CheckboxProps, AriaAttributes>) => {
  const errorMessageId = useId();
  const labelId = useId();

  const clickCheckbox = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: clickCheckbox });

  const baseClassses = sc(
    'checkbox',
    kind && kind,
    error && 'error',
    checked && 'selected',
    disabled && 'disabled'
  );

  const iconColorVar = kind ? `--rothko-${kind}-foreground` : '--rothko-checkbox-icon-background';

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
      >
        {checked && <Checkmark fill={`var(${iconColorVar})`} width="100%" height="100%" />}
      </div>
      {children &&
        (isString(children) ? (
          <Typography.body className={classNames.label} style={stylesProp.label} id={labelId}>
            {children}
          </Typography.body>
        ) : (
          <div className={classNames.label} style={stylesProp.label} id={labelId}>
            {children}
          </div>
        ))}
      {error && (
        <Typography.body
          className={classNames.errorText}
          style={stylesProp.errorText}
          id={errorMessageId}
          kind="danger"
        >
          {errorText}
        </Typography.body>
      )}
    </div>
  );
};

export default Checkbox;
