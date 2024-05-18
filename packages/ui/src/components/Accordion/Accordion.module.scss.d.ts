export type Styles = {
  accordion: string;
  accordion__panel: string;
  accordion__panel__content: string;
  accordion__panel__label: string;
  'accordion__panel--danger': string;
  'accordion__panel--info': string;
  'accordion__panel--primary': string;
  'accordion__panel--secondary': string;
  'accordion__panel--success': string;
  'accordion__panel--warning': string;
  accordion__text: string;
  bordered: string;
  compact: string;
  disabled: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
