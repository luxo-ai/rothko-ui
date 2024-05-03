export type Styles = {
  typography: string;
  typography__code: string;
  'typography__code--bold': string;
  'typography__code--danger': string;
  'typography__code--info': string;
  'typography__code--italic': string;
  'typography__code--light': string;
  'typography__code--primary': string;
  'typography__code--secondary': string;
  'typography__code--success': string;
  'typography__code--warning': string;
  typography__heading: string;
  typography__heading__h1: string;
  typography__heading__h2: string;
  typography__heading__h3: string;
  typography__heading__h4: string;
  typography__heading__h5: string;
  typography__heading__h6: string;
  'typography__heading--bold': string;
  'typography__heading--danger': string;
  'typography__heading--info': string;
  'typography__heading--italic': string;
  'typography__heading--light': string;
  'typography__heading--primary': string;
  'typography__heading--secondary': string;
  'typography__heading--success': string;
  'typography__heading--warning': string;
  typography__paragraph: string;
  typography__paragraph__caption: string;
  typography__paragraph__label: string;
  typography__paragraph__small: string;
  'typography__paragraph--bold': string;
  'typography__paragraph--danger': string;
  'typography__paragraph--info': string;
  'typography__paragraph--italic': string;
  'typography__paragraph--light': string;
  'typography__paragraph--primary': string;
  'typography__paragraph--secondary': string;
  'typography__paragraph--success': string;
  'typography__paragraph--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
