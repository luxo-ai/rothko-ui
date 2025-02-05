import React from 'react';
import type { RothkoKind, RothkoSize } from '@rothko-ui/system';
import type { ButtonAppearance, ButtonVariant } from '../types';
import styles from './ButtonGroup.module.scss';
import { classes, scopedClasses } from '@rothko-ui/system';

const sc = scopedClasses(styles);

type ButtonGroupProps = {
  /**
   * The `id` attribute of the button group.
   * @type {string}
   */
  id?: string;
  /**
   * The appearance style of buttons in the group.
   * @type {ButtonAppearance}
   */
  appearance?: ButtonAppearance;
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

const ButtonGroup = ({
  appearance,
  children,
  className,
  gap,
  kind,
  noEffect,
  variant,
  size,
  style = {},
}: ButtonGroupProps) => {
  const baseClasses = sc('button-group', noEffect && 'no-effect');
  const buttonChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.type !== 'button') {
      // eslint-disable-next-line no-console
      console.warn("ButtonGroup expects 'button' elements as children.");
    }
    return React.cloneElement(child, {
      ...(child.props || {}),
      key: child.key || `bttn${index}`,
      appearance: child.props.appearance || appearance,
      variant: child.props.variant || variant,
      kind: child.props.kind || kind,
      size: child.props.size || size,
    });
  });

  return (
    <div style={{ ...style, gap: gap || style.gap }} className={classes(baseClasses, className)}>
      {buttonChildren}
    </div>
  );
};

export default ButtonGroup;
