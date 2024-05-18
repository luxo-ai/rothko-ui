export type Styles = {
  disabled: string;
  menu: string;
  menu__empty: string;
  menu__item: string;
  'menu__item--selected': string;
  'menu--reverse': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
