export type Styles = {
  'tag__close-button': string;
  'tag--filled': string;
  'tag--filled--danger': string;
  'tag--filled--info': string;
  'tag--filled--primary': string;
  'tag--filled--secondary': string;
  'tag--filled--success': string;
  'tag--filled--warning': string;
  'tag--outline': string;
  'tag--outline--danger': string;
  'tag--outline--info': string;
  'tag--outline--primary': string;
  'tag--outline--secondary': string;
  'tag--outline--success': string;
  'tag--outline--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
