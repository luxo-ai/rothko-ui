import React from 'react';

import { classes, scopedClasses, keyDownFactory, ListenableKeys, useId } from '@rothko-ui/system';

import type { RothkoKind, WithAria } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import styles from './Radio.module.scss';

const sc = scopedClasses(styles);

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
  style,
}: WithAria<RadioInnerProps, AriaAttributes>) => {
  const labelId = useId();

  const clickRadio = () => {
    if (disabled) return;
    onSelect();
  };

  const onKeyDown = keyDownFactory({ [ListenableKeys.Enter]: clickRadio });

  const outerDivClassess = sc('radio__outer-circle', disabled && 'disabled', error && 'error');

  const middleDivClasses = sc(
    'radio__middle-circle',
    error && 'error',
    selected && 'selected',
    kind && kind
  );

  return (
    <div style={style} className={classes(styles['radio__container'], className)}>
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
        className={outerDivClassess}
        onClick={() => clickRadio()}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div aria-hidden className={middleDivClasses}>
          {selected && <div aria-hidden className={styles['radio__inner-circle']} />}
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
