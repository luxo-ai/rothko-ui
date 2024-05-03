export type Styles = {
  alert: string;
  'alert--danger': string;
  'alert--filled': string;
  'alert--info': string;
  'alert--outline': string;
  'alert--primary': string;
  'alert--secondary': string;
  'alert--success': string;
  'alert--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
