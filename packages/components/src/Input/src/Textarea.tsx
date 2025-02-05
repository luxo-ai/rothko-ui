import React from 'react';

import { classes, scopedClasses } from '@rothko-ui/system';

import type { HtmlTextareaProps } from './types';
import styles from './Input.module.scss';

const sc = scopedClasses(styles);

type TextareaProps = HtmlTextareaProps & {
  error?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = sc('input', 'textarea', error && 'error');
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
