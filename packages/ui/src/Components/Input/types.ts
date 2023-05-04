import type React from 'react';
import type { RothkoSize } from '../../Theme';

export type InputSize = Extract<RothkoSize, 's' | 'm' | 'l'>;

export type HtmlInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'ref' | 'size' | 'as' | 'theme'
>;

export type HtmlTextareaProps = Omit<
  React.HTMLProps<HTMLTextAreaElement>,
  'ref' | 'size' | 'as' | 'theme'
>;
