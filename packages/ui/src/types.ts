// ~~ Sizes ~~
export type EmSize = `${number}em`;
export type RemSize = `${number}rem`;
export type PercentSize = `${number}%`;
export type ViewportSize = `${number}vw` | `${number}vh`;

export interface AriaLabelingProps {
  /**
   * Defines a string value that labels the current element.
   */
  'aria-label'?: string;

  /**
   * Identifies the element (or elements) that labels the current element.
   */
  // chekbox - good example
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
  'aria-labelledby'?: string;

  /**
   * Identifies the element (or elements) that describes the object.
   */
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
  'aria-describedby'?: string;

  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the object.
   */
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-details
  'aria-details'?: string;
}

export interface AriaValidationProps {
  // https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
  /**
   * Identifies the element that provides an error message for the object.
   */
  'aria-errormessage'?: string;
}

export interface AriaToggleProps extends AriaLabelingProps, AriaValidationProps {
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   */
  'aria-controls'?: string;
}
