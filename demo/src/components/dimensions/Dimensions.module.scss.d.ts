export type Styles = {
  'desktop-only': string;
  'mobile-only': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
