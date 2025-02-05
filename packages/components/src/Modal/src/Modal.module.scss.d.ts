export type Styles = {
  modal: string;
  modal__body: string;
  'modal__close-button': string;
  modal__header: string;
  'modal__header--l': string;
  'modal__header--m': string;
  'modal__header--s': string;
  'modal__header--xs': string;
  'modal--l': string;
  'modal--m': string;
  'modal--s': string;
  'modal--xs': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
