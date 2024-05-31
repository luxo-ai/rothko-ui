import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { HtmlTextareaProps, TextProps } from './types';
import styles from './Input.module.scss';

const scoppedClasses = sc(styles);

type TextareaProps = HtmlTextareaProps & {
  error?: boolean;
  /**
   * The variant of the textarea.
   */
  variant?: keyof TextProps;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, variant, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = scoppedClasses(
      'textarea',
      variant && `textarea--${variant}`,
      error && 'error'
    );
    return (
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={classes(baseClasses, className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        role="textbox"
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
