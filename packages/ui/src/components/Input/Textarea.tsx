import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { HtmlTextareaProps, InputSize, TextProps } from './types';
import styles from './Input.module.scss';

const scoppedClasses = sc(styles);

type TextareaProps = HtmlTextareaProps & {
  /** textarea size */
  size?: InputSize;
  error?: boolean;
  /**
   * The variant of the textarea.
   */
  variant?: keyof TextProps;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'm', error, variant, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = scoppedClasses(
      'textarea',
      `textarea--${size}`,
      variant && `textarea--${variant}`,
      error && 'error'
    );
    return (
      <textarea
        ref={ref}
        className={classes(baseClasses, className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        role="textbox"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
