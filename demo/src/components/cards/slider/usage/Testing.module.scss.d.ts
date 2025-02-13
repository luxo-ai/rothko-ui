export type Styles = {
  testing: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
