export type Styles = {
  'item-text': string;
  'place-holder': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
