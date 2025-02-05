export type Styles = {
  'color--danger': string;
  'color--info': string;
  'color--primary': string;
  'color--secondary': string;
  'color--success': string;
  'color--warning': string;
  subtext: string;
  text: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
