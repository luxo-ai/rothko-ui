import React from 'react';
import keyboardKey from 'keyboard-key';

import { classes, scopedClasses } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import useId from '../../library/hooks/useId';
import { keyDownFactory } from '../../library/utils/keyUtils';
import styles from './Radio.module.scss';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

export type AriaAttributes =
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'aria-errormessage';

export type RadioInnerProps = {
  id?: string;
  /**
   * The content to be rendered inside the radio component.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the radio component.
   */
  className?: string;
  /**
   * Specifies whether the radio component is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether the radio component has an error.
   */
  error?: boolean;
  /**
   * The visual style of the radio component.
   */
  kind?: RothkoKind;
  /**
   * The callback function to be called when the radio component is selected.
   */
  onSelect: () => void;
  /**
   * Specifies whether the radio component is selected.
   */
  selected?: boolean;
  /**
   * The inline style for the radio component.
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

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: clickRadio });

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
          <Typography.body id={labelId}>{children}</Typography.body>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
    </div>
  );
};

export default RadioInner;
