import { classes, useId, isString, ListenableKeys, keyDownFactory } from '@rothko-ui/system';
import type { CSSProperties } from 'react';
import React from 'react';
import type { WithAria, RothkoKind, Dictionary } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';

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

const rothkoKindBg = {
  danger: 'bg-(--rothko-danger)',
  info: 'bg-(--rothko-info)',
  success: 'bg-(--rothko-success)',
  warning: 'bg-(--rothko-warning)',
  primary: 'bg-(--rothko-primary)',
  secondary: 'bg-(--rothko-secondary)',
} as const;

const Switch = ({
  children,
  className,
  classNames = {},
  disabled,
  kind,
  offIcon,
  onChange,
  onIcon,
  style = {},
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

  const switchVarStyle = {
    '--switch-background-selected': kind
      ? `var(--rothko-${kind})`
      : 'var(--rothko-switch-background-focus)',
  } as React.CSSProperties;

  const switchTrackClassnames = classes(
    'hide-chrome-browser-outline',
    'ios-tap-highlight-color-transparent',
    'flex',
    'justify-start',
    'items-center',
    !disabled && 'cursor-pointer',
    'user-select-none',
    'outline-none',
    'w-[2.5rem]',
    'h-[calc(1.25rem_+_2px)]',
    'rounded-full',
    !selected && 'bg-(--rothko-switch-background)',
    'transition-colors duration-250 ease-in',
    selected && 'bg-(--switch-background-selected)',
    error && 'outline outline-[1px] outline-(--rothko-danger-500)',
    disabled && 'cursor-not-allowed opacity-60'
  );

  const switchHandleClassnames = classes(
    'flex',
    'justify-center',
    'items-center',
    'w-[1.25rem]',
    'h-[1.25rem]',
    'my-0',
    'mx-[1px]',
    'rounded-full',
    'bg-(--rothko-switch-handle-background)',
    'transition-transform duration-[0.15s] ease-in-out',
    selected && 'transform translate-x-[calc(1.25rem_-_2px)]'
  );

  return (
    <div
      className={classes('flex items-center gap-[0.5rem]', className)}
      style={{ ...style, ...switchVarStyle }}
    >
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
        className={switchTrackClassnames}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        role="switch"
        tabIndex={0}
      >
        <div className={switchHandleClassnames}>
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
