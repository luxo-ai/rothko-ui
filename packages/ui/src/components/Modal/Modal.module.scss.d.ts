export type Styles = {
  'modal-close-button': string;
  'modal-container': string;
  'modal-header': string;
  'modal-header-size-l': string;
  'modal-header-size-m': string;
  'modal-header-size-s': string;
  'modal-header-size-xs': string;
  'modal-size-l': string;
  'modal-size-m': string;
  'modal-size-s': string;
  'modal-size-xs': string;
  'phantom-button': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
