export type Styles = {
  alignContent: string;
  alignItems: string;
  alignSelf: string;
  columnGap: string;
  gap: string;
  grid: string;
  gridAutoColumns: string;
  gridAutoFlow: string;
  gridAutoRows: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridColumnStart: string;
  gridRow: string;
  gridRowEnd: string;
  gridRowStart: string;
  gridTemplateAreas: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  justifyContent: string;
  justifyItems: string;
  justifySelf: string;
  placeContent: string;
  placeItems: string;
  placeSelf: string;
  rowGap: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
