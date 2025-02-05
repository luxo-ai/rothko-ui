import type React from 'react';

export type HtmlInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref' | 'size' | 'error' | 'as'
>;

export type HtmlTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'ref' | 'size' | 'error' | 'as'
>;
