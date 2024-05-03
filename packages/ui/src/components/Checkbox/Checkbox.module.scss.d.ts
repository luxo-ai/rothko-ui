export type Styles = {
  checkbox: string;
  checkbox__container: string;
  'checkbox--danger': string;
  'checkbox--info': string;
  'checkbox--primary': string;
  'checkbox--secondary': string;
  'checkbox--success': string;
  'checkbox--warning': string;
  disabled: string;
  error: string;
  selected: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
