export type Styles = {
  'inline-spinner': string;
  'inline-spinner--l': string;
  'inline-spinner--m': string;
  'inline-spinner--s': string;
  'inline-spinner--xs': string;
  load: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
