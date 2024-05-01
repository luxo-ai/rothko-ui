import { classes } from '@rothko-ui/utils';
import React from 'react';
import type { HtmlTextareaProps, InputSize } from './types';
import styles from './Input.module.scss';

type TextareaProps = {
  /** textarea size */
  $size?: InputSize;
  $error?: boolean;
} & HtmlTextareaProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ $size = 'm', className, disabled, tabIndex, $error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classes(
          styles['textarea'],
          styles[`inpt_size_${$size}`],
          $error && styles['error'],
          className
        )}
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
