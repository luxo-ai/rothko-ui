import type { LazyExoticComponent } from 'react';

import type { Language } from '../Code';

export type CardCopy = {
  title: string;
  description: string;
  sections?: Section[];
};

export type Section = {
  variant?: HeaderVariant;
  title?: string;
  subtitle?: string;
  body: Body;
};

// meta data for a prop
export type ComponentProperty = Readonly<{
  name: string;
  type: string;
  defaultValue: string | number | null | boolean;
  description: string;
}>;

export type Body =
  | string
  | string[]
  | Section
  | Section[]
  | {
      kind: 'lazyComponent';
      component: LazyExoticComponent<() => JSX.Element>;
    }
  | {
      kind: 'code';
      language: Language;
      showLanguage?: boolean;
      showLineNumbers?: boolean;
      text?: string;
      code: string;
    }
  | {
      kind: 'code';
      language: Language;
      text?: string;
      showLanguage?: boolean;
      showLineNumbers?: boolean;
      code: {
        icon?: LazyExoticComponent<() => JSX.Element>;
        tag: string;
        text: string;
      }[];
    }
  | CCode[];

export type CCode = {
  kind: 'code';
  language: Language;
  text?: string;
  showLanguage?: boolean;
  showLineNumbers?: boolean;
  code: string;
};

export type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
