export type Styles = {
  error: string;
  input: string;
  'input--bold': string;
  'input--italic': string;
  'input--l': string;
  'input--light': string;
  'input--m': string;
  'input--s': string;
  textarea: string;
  'textarea--bold': string;
  'textarea--italic': string;
  'textarea--l': string;
  'textarea--light': string;
  'textarea--m': string;
  'textarea--s': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
