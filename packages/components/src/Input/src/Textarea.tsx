import React from 'react';

import type { HtmlTextareaProps } from './types';
import { inputBaseCls } from './styles';

type TextareaProps = HtmlTextareaProps & {
  error?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={inputBaseCls({ error, disabled })(
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
