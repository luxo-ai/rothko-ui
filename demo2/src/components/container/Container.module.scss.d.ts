export type Styles = {
  background: string;
  backgroundColor: string;
  border: string;
  borderBottom: string;
  borderLeft: string;
  borderRadius: string;
  borderRight: string;
  borderTop: string;
  box: string;
  boxShadow: string;
  display: string;
  flex: string;
  flexBasis: string;
  flexGrow: string;
  flexShrink: string;
  height: string;
  margin: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  maxHeight: string;
  maxWidth: string;
  opacity: string;
  overflow: string;
  padding: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  position: string;
  width: string;
  zIndex: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
