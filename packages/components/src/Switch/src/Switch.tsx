import {
  classes,
  useId,
  isString,
  scopedClasses,
  ListenableKeys,
  keyDownFactory,
} from '@rothko-ui/system';
import type { CSSProperties } from 'react';
import React from 'react';
import type { WithAria, RothkoKind, Dictionary } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import styles from './Switch.module.scss';

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
  /**
   * The `id` attribute of the switch.
   * @type {string}
   */
  id?: string;
  /**
   * The content to be rendered inside the switch.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Additional class names for the switch.
   * @type {Object<StyleableComponents, string>}
   */
  classNames?: Dictionary<StyleableComponents, string>;
  /**
   * Specifies whether the switch is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Specifies whether the switch has an error state.
   * @type {boolean}
   * @default false
   */
  error?: boolean;
  /**
   * The error text to be displayed when the switch is in an error state.
   * @type {string}
   * @default 'Invalid'
   */
  errorText?: string;
  /**
   * The switch's semantic style.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * The icon element to be displayed when the switch is in the "off" state.
   * @type {React.ReactNode}
   */
  offIcon?: JSX.Element;
  /**
   * The event handler called when the switch's value changes.
   */
  onChange: (Switchd: boolean) => void;
  /**
   * The icon element to be displayed when the switch is in the "on" state.
   * @type {React.ReactNode}
   */
  onIcon?: JSX.Element;
  /**
   * Specifies whether the switch is required.
   * @type {boolean}
   * @default false
   */
  required?: boolean;
  /**
   * The inline style object to be applied to the switch.
   * @type {React.CSSProperties}
   */
  style?: CSSProperties;
  /**
   * Additional inline styles for the switch.
   * @type {Object<StyleableComponents, React.CSSProperties>}
   */
  styles?: Dictionary<StyleableComponents, CSSProperties>;
  /**
   * Specifies whether the switch is selected.
   * @type {boolean}
   * @default false
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

  const onKeyDown = keyDownFactory({ [ListenableKeys.Enter]: handleChange });

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
          <Paragraph className={classNames.label} style={stylesProp.label} id={labelId}>
            {children}
          </Paragraph>
        ) : (
          <div className={classNames.label} style={stylesProp.label} id={labelId}>
            {children}
          </div>
        ))}
      {error && (
        <Paragraph
          className={classNames.errorText}
          style={stylesProp.errorText}
          id={errorMessageId}
          kind="danger"
        >
          {errorText}
        </Paragraph>
      )}
    </div>
  );
};

export default Switch;
