export type Styles = {
  'autocomplete__phantom-input': string;
  'autocomplete__phantom-input--bold': string;
  'autocomplete__phantom-input--italic': string;
  'autocomplete__phantom-input--light': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
