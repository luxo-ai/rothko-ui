export type Styles = {
  accordion: string;
  accordion__panel: string;
  accordion__panel__content: string;
  accordion__panel__label: string;
  accordion__text: string;
  bordered: string;
  compact: string;
  danger: string;
  disabled: string;
  info: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
