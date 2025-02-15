export type Styles = {
  handle: string;
  'inner-handle': string;
  'inner-handle-movement': string;
  'pseudo-handle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
