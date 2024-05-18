import { classes, isString, scopedClasses as sc } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import { Typography } from '../Typography';
import useId from '../../library/hooks/useId';
import type { WithAria } from './types';
import styles from './Switch.module.scss';

const scopedClasses = sc(styles);

type SwitchProps = WithAria<{
  id?: string;
  /**
   * The content to be rendered inside the Switch component.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name to be applied to the Switch component.
   */
  className?: string;
  /**
   * Specifies whether the Switch component is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether the Switch component has an error state.
   */
  error?: boolean;
  /**
   * The error text to be displayed when the Switch component is in an error state.
   * @default 'Invalid'
   */
  errorText?: string;
  /**
   * The visual style of the Switch component.
   */
  kind?: RothkoKind;
  /**
   * The icon element to be displayed when the Switch component is in the "off" state.
   */
  offIcon?: JSX.Element;
  /**
   * The event handler called when the Switch component's value changes.
   */
  onChange: (Switchd: boolean) => void;
  /**
   * The icon element to be displayed when the Switch component is in the "on" state.
   */
  onIcon?: JSX.Element;
  /**
   * Specifies whether the Switch component is required.
   */
  required?: boolean;
  /**
   * The inline style object to be applied to the Switch component.
   */
  style?: CSSProperties;
  /**
   * Specifies whether the Switch component is selected.
   */
  selected?: boolean;
}>;

const Switch = ({
  children,
  className,
  disabled,
  kind,
  offIcon,
  onChange,
  onIcon,
  style,
  selected,
  error,
  errorText = 'Invalid',
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
  id,
}: SwitchProps) => {
  const labelId = useId();
  const errorMessageId = useId();

  const handleChange = () => {
    if (disabled) return;
    onChange(!selected);
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });

  return (
    <div className={classes(styles['switch__container'], className)} style={style}>
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
        aria-checked={!!selected}
        aria-disabled={ariaDisabled || disabled}
        aria-label={ariaLabel}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        className={scopedClasses(
          'switch__outer-circle',
          selected && 'selected',
          selected && kind && `selected--${kind}`,
          disabled && 'disabled',
          error && 'error'
        )}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        role="switch"
        tabIndex={0}
      >
        <div aria-hidden className={scopedClasses('switch__inner-circle', selected && 'active')}>
          {selected ? onIcon && <>{onIcon}</> : offIcon && <>{offIcon}</>}
        </div>
      </div>
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

export default Switch;
