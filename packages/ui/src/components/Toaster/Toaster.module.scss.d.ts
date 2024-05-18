export type Styles = {
  danger: string;
  info: string;
  primary: string;
  secondary: string;
  success: string;
  toast: string;
  'toast__animated-backdrop': string;
  'toast__animated-life': string;
  'toast__close-button': string;
  'toast__content-container': string;
  toasts: string;
  warning: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
