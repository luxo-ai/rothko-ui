export type Styles = {
  link: string;
  'link__underline-always': string;
  'link__underline-hover': string;
  'link__underline-none': string;
  'link--disabled': string;
  'link-small': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
