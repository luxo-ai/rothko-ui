import { classes, keyDownFactory, ListenableKeys, useId } from '@rothko-ui/system';
import type { RothkoKind, WithAria } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import React from 'react';

export type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'aria-errormessage';

export type RadioInnerProps = {
  /**
   * The `id` attribute of the radio component.
   * @type {string}
   */
  id?: string;
  /**
   * The content to be rendered inside the radio component.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Specifies whether the radio component is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Specifies whether the radio component has an error.
   * @type {boolean}
   * @default false
   */
  error?: boolean;
  /**
   * The radio component's semantic style.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * The callback function to be called when the radio component is selected.
   */
  onSelect: () => void;
  /**
   * Specifies whether the radio component is selected.
   * @type {boolean}
   * @default false
   */
  selected?: boolean;
  /**
   * The inline style for the radio component.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
};

const rothkoKindBg = {
  danger: 'bg-(--rothko-danger)',
  info: 'bg-(--rothko-info)',
  success: 'bg-(--rothko-success)',
  warning: 'bg-(--rothko-warning)',
  primary: 'bg-(--rothko-primary)',
  secondary: 'bg-(--rothko-secondary)',
} as const;

const RadioInner = ({
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-controls': ariaControls,
  'aria-errormessage': ariaErrorMessage,
  children,
  className,
  disabled,
  error,
  kind,
  onSelect,
  selected,
  style = {},
}: WithAria<RadioInnerProps, AriaAttributes>) => {
  const labelId = useId();

  const clickRadio = () => {
    if (disabled) return;
    onSelect();
  };

  const onKeyDown = keyDownFactory({ [ListenableKeys.Enter]: clickRadio });

  const radioVarStyle = {
    '--radio-selected-background': kind
      ? `var(--rothko-${kind})`
      : 'var(--rothko-radio-background-focus)',
  } as React.CSSProperties;

  const radioContainerClassnames = classes(
    'flex',
    'items-center',
    'justify-start',
    'gap-[0.3rem]',
    'rothko-color-body',
    'rothko-font-regular',
    'rothko-paragraph-size-default',
    className
  );

  const radioOuterCircleClassnames = classes(
    'w-[1.25rem]',
    'h-[1.25rem]',
    'rounded-full',
    'p-[0.125rem]',
    !disabled && 'cursor-pointer',
    'bg-(--rothko-radio-border)',
    disabled && 'cursor-not-allowed',
    disabled && 'opacity-60',
    error && 'outline outline-[1.5px] outline-[var(--danger-500)] outline-offset-[0.5px]'
  );

  const radioMiddleCircleClassnames = classes(
    'w-full',
    'h-full',
    'rounded-full',
    'p-[0.25rem]',
    !selected && 'bg-(--rothko-radio-background)',
    'transition-[background-color 0.1s ease]',
    !error && selected && 'bg-(--radio-selected-background)',
    error && selected && 'bg-(--rothko-danger-500)'
  );

  const radioInnerCircleClassnames = 'w-full h-full rounded-full bg-(--rothko-radio-border)';

  return (
    <div style={{ ...style, ...radioVarStyle }} className={radioContainerClassnames}>
      <div
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && children ? labelId : ariaLabelledBy}
        aria-controls={ariaControls}
        aria-checked={!!selected}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-errormessage={ariaErrorMessage}
        role="radio"
        className={radioOuterCircleClassnames}
        onClick={() => clickRadio()}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div aria-hidden className={radioMiddleCircleClassnames}>
          {selected && <div aria-hidden className={radioInnerCircleClassnames} />}
        </div>
      </div>
      {children &&
        (typeof children === 'string' ? (
          <Paragraph id={labelId}>{children}</Paragraph>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
    </div>
  );
};

export default RadioInner;
