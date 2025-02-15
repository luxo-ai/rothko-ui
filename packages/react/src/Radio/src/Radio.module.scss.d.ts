export type Styles = {
  danger: string;
  disabled: string;
  error: string;
  info: string;
  primary: string;
  radio__container: string;
  'radio__inner-circle': string;
  'radio__middle-circle': string;
  'radio__outer-circle': string;
  secondary: string;
  selected: string;
  success: string;
  warning: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
