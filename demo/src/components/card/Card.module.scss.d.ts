export type Styles = {
  bodySubtext: string;
  componentCard: string;
  hashLinkableHeader: string;
  propsContainer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
