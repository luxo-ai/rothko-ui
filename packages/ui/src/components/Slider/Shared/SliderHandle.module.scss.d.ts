export type Styles = {
  active: string;
  handle: string;
  'handle--danger': string;
  'handle--info': string;
  'handle--primary': string;
  'handle--secondary': string;
  'handle--success': string;
  'handle--warning': string;
  vertical: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
