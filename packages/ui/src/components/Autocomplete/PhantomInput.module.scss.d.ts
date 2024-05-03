export type Styles = {
  'phantom-input': string;
  'phantom-input--bold': string;
  'phantom-input--italic': string;
  'phantom-input--light': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
