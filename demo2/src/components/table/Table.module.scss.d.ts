export type Styles = {
  pivoted: string;
  table: string;
  tdBefore: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
