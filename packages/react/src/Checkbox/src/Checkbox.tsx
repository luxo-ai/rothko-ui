import React from 'react';

import { Checkmark } from '@rothko-ui/icons';
import type { Dictionary, RothkoKind, WithAria } from '@rothko-ui/system';
import { classes, isString, useId, keyDownFactory, ListenableKeys } from '@rothko-ui/system';

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

type CheckboxProps = {
  /**
   * The `id` attribute of the checkbox.
   * @type {string}
   */
  id?: string;
  /**
   * Specifies whether the checkbox is checked.
   * @type {boolean}
   * @default false
   */
  checked?: boolean;
  /**
   * The content to be displayed inside the checkbox.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * CSS class name(s) for the checkbox components.
   * @type {Object<StyleableComponents, string>}
   */
  classNames?: Dictionary<StyleableComponents, string>;
  /**
   * Specifies whether the checkbox is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Specifies whether there is an error with the checkbox.
   * @type {boolean}
   * @default false
   */
  error?: boolean;
  /**
   * The error text to be displayed when there is an error.
   * @type {string}
   * @default: 'Invalid'
   */
  errorText?: string;
  /**
   * The checkbox's semantic style.
   * @type {RothkoKind}
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
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * Additional inline styles for the checkbox components.
   * @type {Object<StyleableComponents, React.CSSProperties>}
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

  const onKeyDown = keyDownFactory({ [ListenableKeys.Enter]: clickCheckbox });

  const checkboxVarStyle = {
    '--checkbox-background-checked': kind
      ? `var(--rothko-${kind})`
      : 'var(--rothko-checkbox-background-focus)',
    '--checkbox-foreground-checked': kind
      ? `var(--rothko-${kind}-foreground)`
      : 'var(--rothko-checkbox-icon-background)',
  } as React.CSSProperties;

  const baseClasses = classes(
    'ios-tap-highlight-color-transparent',
    'flex',
    'items-center',
    'justify-center',
    'w-[1.125rem]', // add to tokens
    'h-[1.125rem]',
    'cursor-pointer',
    'rounded-[1px]', // add to tokens?
    'p-[0.125rem]', // add to tokens
    'bg-(--rothko-checkbox-background)',
    'transition-[background-color] ease-[0.1s]',
    checked && 'bg-(--checkbox-background-checked)', // local var
    checked && 'text-(--checkbox-foreground-checked)', // local var
    'focus-visible:outline',
    'focus-visible:outline-1',
    'focus-visible:outline-(--rothko-info-300)', // replacce with token
    error && 'peer group bg-[rgba(var(--rothkoDanger),0.1)]', // check if works
    disabled && 'cursor-not-allowed',
    disabled && 'opacity-60' // make token => disabled opacity
  );

  return (
    <div
      style={style}
      className={classes('relative flex items-center justify-start gap-2', className)}
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
        aria-checked={!!checked}
        aria-disabled={ariaDisabled || disabled}
        aria-label={ariaLabel}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        className={baseClasses}
        style={checkboxVarStyle}
        onClick={() => clickCheckbox()}
        onKeyDown={onKeyDown}
        role="checkbox"
        tabIndex={0}
      >
        {checked && <Checkmark fill="currentColor" width="100%" height="100%" />}
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

export default Checkbox;
