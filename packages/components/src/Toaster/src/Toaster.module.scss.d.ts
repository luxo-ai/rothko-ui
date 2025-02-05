export type Styles = {
  toast: string;
  'toast__animated-backdrop': string;
  'toast__animated-life': string;
  'toast__animated-life--danger': string;
  'toast__animated-life--info': string;
  'toast__animated-life--primary': string;
  'toast__animated-life--secondary': string;
  'toast__animated-life--success': string;
  'toast__animated-life--warning': string;
  'toast__close-button': string;
  'toast__content-container': string;
  'toast__content-container--danger': string;
  'toast__content-container--info': string;
  'toast__content-container--primary': string;
  'toast__content-container--secondary': string;
  'toast__content-container--success': string;
  'toast__content-container--warning': string;
  'toast--danger': string;
  'toast--info': string;
  'toast--primary': string;
  'toast--secondary': string;
  'toast--success': string;
  'toast--warning': string;
  toasts: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
