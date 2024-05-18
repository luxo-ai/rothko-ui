export type Styles = {
  disabled: string;
  'slider-range': string;
  'slider-range--danger': string;
  'slider-range--info': string;
  'slider-range--primary': string;
  'slider-range--secondary': string;
  'slider-range--success': string;
  'slider-range--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
