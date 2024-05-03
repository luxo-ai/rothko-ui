import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { HtmlTextareaProps, InputSize, TextProps } from './types';
import styles from './Input.module.scss';

const scoppedClasses = sc(styles);

type TextareaProps = HtmlTextareaProps &
  TextProps & {
    /** textarea size */
    size?: InputSize;
    error?: boolean;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'm', error, light, bold, italic, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = scoppedClasses(
      'textarea',
      `textarea--${size}`,
      light && 'textarea--light',
      bold && 'textarea--bold',
      italic && 'textarea--italic',
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
