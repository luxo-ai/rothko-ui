export type Styles = {
  link: string;
  'link__underline-always': string;
  'link__underline-hover': string;
  'link__underline-none': string;
  'link--bold': string;
  'link--danger': string;
  'link--info': string;
  'link--italic': string;
  'link--light': string;
  'link--primary': string;
  'link--secondary': string;
  'link--success': string;
  'link--warning': string;
  'link-button--disabled': string;
  'link-small': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
