export type Styles = {
  error: string;
  input: string;
  'input--bold': string;
  'input--italic': string;
  'input--light': string;
  textarea: string;
  'textarea--bold': string;
  'textarea--italic': string;
  'textarea--light': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
