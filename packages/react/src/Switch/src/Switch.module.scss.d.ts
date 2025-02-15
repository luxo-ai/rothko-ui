export type Styles = {
  danger: string;
  disabled: string;
  error: string;
  focus: string;
  info: string;
  primary: string;
  secondary: string;
  selected: string;
  success: string;
  switch__container: string;
  'switch__inner-circle': string;
  'switch__outer-circle': string;
  warning: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
