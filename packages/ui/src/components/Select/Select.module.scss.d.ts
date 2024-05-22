export type Styles = {
  'button-reverse': string;
  'multi-select-container': string;
  'multi-select-label': string;
  'nested-button-container': string;
  'nested-dropdown-category-title': string;
  'nested-option-container': string;
  'title-reverse': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
