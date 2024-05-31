export type Styles = {
  active: string;
  handle: string;
  vertical: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
