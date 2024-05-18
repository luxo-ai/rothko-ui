export type Styles = {
  disabled: string;
  'dropdown-menu': string;
  'dropown-container': string;
  'dropown-container--bold': string;
  'dropown-container--italic': string;
  'dropown-container--light': string;
  error: string;
  open: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
