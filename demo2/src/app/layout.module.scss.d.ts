export type Styles = {
  body: string;
  footer: string;
  header: string;
  main: string;
  nav: string;
  navList: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
