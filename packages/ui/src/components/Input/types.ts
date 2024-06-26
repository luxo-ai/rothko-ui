import type React from 'react';
import type { TypographyProps } from '../Typography/types';

export type HtmlInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref' | 'size' | 'error' | 'as'
>;

export type HtmlTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'ref' | 'size' | 'error' | 'as'
>;

export type TextProps = Pick<TypographyProps, 'bold' | 'italic' | 'light'>;
