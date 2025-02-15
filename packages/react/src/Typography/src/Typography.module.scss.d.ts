export type Styles = {
  typography: string;
  typography__code: string;
  typography__heading: string;
  typography__heading__h1: string;
  typography__heading__h2: string;
  typography__heading__h3: string;
  typography__heading__h4: string;
  typography__heading__h5: string;
  typography__heading__h6: string;
  typography__label: string;
  typography__paragraph: string;
  typography__paragraph__l: string;
  typography__paragraph__m: string;
  typography__paragraph__s: string;
  typography__paragraph__xs: string;
  'typography--bold': string;
  'typography--danger': string;
  'typography--info': string;
  'typography--italic': string;
  'typography--light': string;
  'typography--primary': string;
  'typography--secondary': string;
  'typography--success': string;
  'typography--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
