// ~~ Sizes ~~
export type EmSize = `${number}em`;
export type RemSize = `${number}rem`;
export type PercentSize = `${number}%`;
export type ViewportSize = `${number}vw` | `${number}vh`;

type Aria = {
  /**
   * A string value that labels the current element.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  'aria-label'?: string;
  /**
   * Identifies the element (or elements) that labels the current element.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  'aria-labelledby'?: string;
  /**
   * A string value containing a space-separated list of element IDs that provide additional
   * descriptive information for the object.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   */
  'aria-describedby'?: string;
  /**
   * A reference to additional information about the object.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-details
   */
  'aria-details'?: string;
  /**
   * The aria-errormessage attribute on an object identifies the element that provides an error message for that object.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
   */
  'aria-errormessage'?: string;
  /**
   * Indicates that the user may select more than one item from the current selectable descendants.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable
   */
  'aria-multiselectable'?: boolean;
  /**
   * Indicates the orientation of the element's current content.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation
   */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /**
   * Indicates that user input is required on the element before a form may be submitted.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required
   */
  'aria-required'?: boolean;
  /**
   * A human-readable description of the role of the element.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-roledescription
   */
  'aria-roledescription'?: string;
  /**
   * Indicates the current "selected" state of various types of widgets.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
   */
  'aria-selected'?: boolean;
  /**
   * Indicates the current value of a range widget.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow
   */
  'aria-valuenow'?: number;
  /**
   * Indicates the maximum value allowed for the range.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax
   */
  'aria-valuemax'?: number;
  /**
   * Indicates the minimum value allowed for the range.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin
   */
  'aria-valuemin'?: number;

  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
   */
  'aria-checked'?: boolean;

  /**
   * Indicates that the element has a popup context menu or sub-level menu.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
   */
  'aria-haspopup'?: boolean | 'dialog' | 'menu' | 'grid' | 'listbox' | 'tree' | 'true' | 'false';

  /**
   * Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
   */
  'aria-expanded'?: boolean;

  /**
   * Indicates whether the element is exposed to an accessibility API.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
   */
  'aria-hidden'?: boolean;

  /**
   * The aria-invalid state indicates the entered value does not conform to the format expected by the application.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
   */
  'aria-invalid'?: boolean;

  /**
   * Indicates the level of an element within a hierarchical structure.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level
   */
  'aria-level'?: number;

  /**
   * Indicates that the element is a multiline text field.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiline
   */
  'aria-multiline'?: boolean;

  /**
   * Indicates the current "pressed" state of toggle buttons.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed
   */
  'aria-pressed'?: boolean | 'mixed';

  /**
   * The global aria-controls property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
   */
  'aria-controls'?: string;

  /**
   * Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
   */
  'aria-live'?: 'off' | 'assertive' | 'polite';

  /**
   * In ARIA live regions, the global aria-atomic attribute indicates whether assistive technologies such as a screen reader will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic
   */
  'aria-atomic'?: boolean;

  /**
   * Indicates that the element is a modal dialog.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal
   */
  'aria-modal'?: boolean;

  /**
   * Indicates the element's current "selected" state.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
   */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

  /**
   * Indicates that the element is not interactive or perceivable by users.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
   */
  'aria-disabled'?: boolean;

  /**
   * Indicates whether an element is busy and the user should wait.
   * resource - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy
   */
  'aria-busy'?: boolean;
};

export type WithAria<O, T extends keyof Aria> = O & Pick<Aria, T>;
