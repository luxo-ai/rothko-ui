export type Styles = {
  active: string;
  disabled: string;
  error: string;
  focus: string;
  selected: string;
  'selected--danger': string;
  'selected--info': string;
  'selected--primary': string;
  'selected--secondary': string;
  'selected--success': string;
  'selected--warning': string;
  switch__container: string;
  'switch__inner-circle': string;
  'switch__outer-circle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
