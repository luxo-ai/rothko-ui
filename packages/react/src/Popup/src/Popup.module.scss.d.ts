export type Styles = {
  popup: string;
  popup__body: string;
  'popup__close-button': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
