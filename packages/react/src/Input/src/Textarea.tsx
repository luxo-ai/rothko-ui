import React from 'react';

import { createInputBaseClasses } from './styles';

export type HtmlTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'ref' | 'size' | 'error' | 'as'
>;

interface TextareaProps extends HtmlTextareaProps {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={createInputBaseClasses({ error, disabled })(
          'resize-y overflow-y-auto min-h-[6rem] max-h-[16rem]',
          className
        )}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        role="textbox"
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
