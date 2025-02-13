export type Styles = {
  hoverButton: string;
  nav: string;
  paddedNavContainer: string;
  withNavGrid: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
