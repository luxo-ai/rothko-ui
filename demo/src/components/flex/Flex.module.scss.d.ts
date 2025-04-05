export type Styles = {
  alignContent: string;
  alignItems: string;
  alignSelf: string;
  columnGap: string;
  flex: string;
  flexBasis: string;
  flexDirection: string;
  flexGrow: string;
  flexShrink: string;
  flexWrap: string;
  gap: string;
  justifyContent: string;
  justifyItems: string;
  justifySelf: string;
  rowGap: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
