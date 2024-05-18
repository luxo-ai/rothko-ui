import type React from 'react';
import type { RothkoSize } from '../../theme';
import type { TypographyProps } from '../Typography/types';

export type InputSize = Extract<RothkoSize, 's' | 'm' | 'l'>;

export type HtmlInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref' | 'size' | 'error' | 'as'
>;

export type HtmlTextareaProps = Omit<
  React.HTMLProps<HTMLTextAreaElement>,
  'ref' | 'size' | 'error' | 'as'
>;

export type TextProps = Pick<TypographyProps, 'bold' | 'italic' | 'light'>;
