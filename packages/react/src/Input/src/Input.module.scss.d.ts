export type Styles = {
  error: string;
  input: string;
  textarea: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
