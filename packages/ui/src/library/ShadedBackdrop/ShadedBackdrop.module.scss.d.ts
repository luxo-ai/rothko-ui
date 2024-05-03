export type Styles = {
  blur: string;
  'padding-h': string;
  'padding-v': string;
  'shaded-backdrop': string;
  show: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
