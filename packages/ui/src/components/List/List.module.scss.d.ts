export type Styles = {
  list: string;
  list__item: string;
  'list__item--no-bullet': string;
  'list--no-bullet': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
