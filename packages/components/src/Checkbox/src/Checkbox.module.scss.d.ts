export type Styles = {
  checkbox: string;
  checkbox__container: string;
  danger: string;
  disabled: string;
  error: string;
  info: string;
  primary: string;
  secondary: string;
  selected: string;
  success: string;
  warning: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
