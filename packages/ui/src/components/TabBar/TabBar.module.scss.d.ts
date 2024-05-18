export type Styles = {
  tab__item: string;
  'tab__item--bold': string;
  'tab__item--italic': string;
  'tab__item--light': string;
  tab__underline: string;
  'tab__underline--danger': string;
  'tab__underline--info': string;
  'tab__underline--primary': string;
  'tab__underline--secondary': string;
  'tab__underline--success': string;
  'tab__underline--warning': string;
  'tab-list': string;
  'tab-list__container': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
