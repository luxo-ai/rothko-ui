export type Styles = {
  button: string;
  button__accessory: string;
  button__content: string;
  'button--filled--danger': string;
  'button--filled--info': string;
  'button--filled--primary': string;
  'button--filled--secondary': string;
  'button--filled--success': string;
  'button--filled--warning': string;
  'button--fit-content': string;
  'button--l': string;
  'button--m': string;
  'button--outline--danger': string;
  'button--outline--info': string;
  'button--outline--primary': string;
  'button--outline--secondary': string;
  'button--outline--success': string;
  'button--outline--warning': string;
  'button--pill': string;
  'button--s': string;
  'button--square': string;
  'button--xs': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
