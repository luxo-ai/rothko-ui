import { classes, isString, scopedClasses } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import { Typography } from '../Typography';
import useId from '../../library/hooks/useId';
import styles from './Switch.module.scss';
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

type SwitchProps = {
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
   * Additional class names for the Switch component
   */
  classNames?: Partial<Record<StyleableComponents, string>>;
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
   * Additional inline styles for the Switch component.
   */
  styles?: Partial<Record<StyleableComponents, CSSProperties>>;
  /**
   * Specifies whether the Switch component is selected.
   */
  selected?: boolean;
};

const Switch = ({
  children,
  className,
  classNames = {},
  disabled,
  kind,
  offIcon,
  onChange,
  onIcon,
  style,
  styles: stylesProp = {},
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
}: WithAria<SwitchProps, AriaAttributes>) => {
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
        className={sc(
          'switch__outer-circle',
          selected && 'selected',
          kind && kind,
          disabled && 'disabled',
          error && 'error'
        )}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        role="switch"
        tabIndex={0}
      >
        <div className={sc('switch__inner-circle', { selected })}>
          {selected ? onIcon && <>{onIcon}</> : offIcon && <>{offIcon}</>}
        </div>
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

export default Switch;
