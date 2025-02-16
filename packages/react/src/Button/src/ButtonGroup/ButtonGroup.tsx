import type { RothkoKind, RothkoSize } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';
import React from 'react';

import type { ButtonRadius, ButtonVariant } from '../types';

type ButtonGroupProps = {
  /**
   * The `id` attribute of the button group.
   * @type {string}
   */
  id?: string;
  /**
   * The buttons in the group.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The gap between buttons in the group.
   * @type {number | string}
   */
  gap?: number | string;
  /**
   * The semantic style of the buttons in the group.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * If `true`, disables button effects.
   * @type {boolean}
   * @default false
   */
  noEffect?: boolean;
  /**
   * The variant style of the buttons in the group.
   * @type {ButtonVariant}
   */
  variant?: ButtonVariant;
  /**
   * The radius of the button.
   * @type {ButtonRadius}
   * @default 'default'
   */
  radius?: ButtonRadius;
  /**
   * The size of the buttons in the group.
   * @type {RothkoSize}
   */
  size?: RothkoSize;
  /**
   * The inline style for the button group.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
};

const getElementName = (element: React.ReactElement<unknown>) => {
  if (typeof element.type === 'string') {
    return element.type;
  }
  if ('displayName' in element.type && typeof element.type.displayName === 'string') {
    return element.type.displayName;
  }
  return element.type.name;
};

const ButtonGroup = ({
  radius,
  children,
  className,
  gap,
  kind,
  noEffect,
  variant,
  size,
  style = {},
}: ButtonGroupProps) => {
  const buttonChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const elementName = getElementName(child);
    if (elementName !== 'button' && elementName !== 'Button') {
      // eslint-disable-next-line no-console
      console.warn(
        `ButtonGroup expects 'button' elements as children. Found '${elementName}' instead.`
      );
    }

    const childClassNames = classes(
      'first:rounded-r-none',
      'last:rounded-l-none',
      'not-first:not-last:rounded-none',
      !noEffect && 'transition-transform duration-300',
      !noEffect && 'ease-[cubic-bezier(0.39,0.58,0.57,1)]',
      !noEffect && 'active:scale-[0.97]',
      !noEffect && 'motion-reduce:transition-none',
      child.props.className
    );

    return React.cloneElement(child, {
      ...(child.props || {}),
      key: child.key || `bttn${index}`,
      radius: child.props.radius || radius,
      variant: child.props.variant || variant,
      kind: child.props.kind || kind,
      size: child.props.size || size,
      className: childClassNames,
    });
  });

  return (
    <div
      style={{ ...style, gap: gap || style.gap }}
      className={classes('inline-flex items-center justify-center', className)}
    >
      {buttonChildren}
    </div>
  );
};

export default ButtonGroup;
